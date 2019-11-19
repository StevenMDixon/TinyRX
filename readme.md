# TinyRX (react-redux)

[![npm version](https://badge.fury.io/js/tinyrx.svg)](https://badge.fury.io/js/tinyrx)
[![test](https://david-dm.org/stevendixondev/tinyrx.svg)](https://david-dm.org/stevendixondev/tinyrx)
[![Known Vulnerabilities](https://snyk.io/test/github/stevendixondev/tinyrx/badge.svg)](https://snyk.io/test/github/stevendixondev/tinyrx)
[![build passing](https://travis-ci.com/StevenDixonDev/tinyrx.svg?branch=master)](https://travis-ci.com/StevenDixonDev/tinyrx)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Sourcegraph](https://sourcegraph.com/github.com/StevenDixonDev/tinyrx/-/badge.svg)](https://sourcegraph.com/github.com/StevenDixonDev/tinyrx?badge)

:pill: TinyRX is an interface library to add middleware and React-Redux like reducing to Reacts hook system.

## What does tinyRX do

TinyRX adds the missing features into reacts current useReducer landscape

Adds: 

- Combine Reducers
- useMiddleWare

## Use

Adding TinyRX to Your Project is simple!

```JavaScript

import {useMiddleWare, combineReducers} from 'tinyrx';

```

TinyRX no longer provides context, its much easier to create your own.

### Setup

TinyRX requires a minimal setup compared to other libraries.

##### Define Your reducers

```JavaScript
const todoReducer = (state, action) => {
  switch(action.type) {
    case 'ADD_TODO': return [...state, action.payload];
    default: return state;
  }
}

const bookReducer = (state, action) => {
  switch(action.type) {
    case 'ADD_BOOK': return [...state, action.payload]
    default: return state;
  }
}
```

##### Setup the top level App

Note that the name of the keys in combine reducers must match the initial state passed to useReducer.

```JavaScript
// combine reducers combines both Todos and Books together
const rootReducer = combineReducers({Todos: todoReducer, Books: bookReducer});
// warning just like with redux if both reducers have the same Key or Type both will be affected
// create context using react
const AppContext = React.createContext(null);

function App () {
  const [state, dispatch] = useReducer(rootReducer, {Books: [], Todos: []});
  return (
    <div>
      <AppContext.Provider value={{state, dispatch}}>
        <TodoComponent />
      </AppContext.Provider>
    </div>
  )
}
```

### Define a component to consume the Context

```JavaScript
function TodoComponent() {
  // useContext provides state and the dispatch function to your components
  const {state, dispatch} = useContext(AppContext);
  const [input, setInput] = useState("");
  function AddTodo(e){
    dispatch({type: 'ADD_TODO', payload: input})
  }

  function UpdateInput(e) {
    e.persist();
    setInput(input => e.target.value);
  }
  return (
  <div>
    <ul>
    {state.Todos.map(item => <li>{item}</li>)}
    </ul>
    <input onChange={UpdateInput}></input>
    <button onClick={AddTodo}>Click me</button>
  </div>
  )
}
```

## MiddleWare

Using middleware is trivial! Just pass in an array of middleware you want to use to the new useMiddleware function!
The dispatch passed to context must be changed to use the function returned from useMiddleWare; heres an example with thunk!

```JavaScript
function App () {
  const AppContext = context;
  const [state, dispatch] = useReducer(Reducers, {Loaded: false});

  return (
    <div>
      <AppContext.Provider value={useMiddleWare([thunk], { state, dispatch })}>
        <Loader />
      </AppContext.Provider>
    </div>
  )
}

function Loader() {
  const { state, dispatch } = useContext(context);
  const testAsync = e => {
    dispatch(fetchPosts());
  };
  return (
    <div>
      {!state.Loaded ? <p>loaded</p> : <p>...loading</p>}
      <button onClick={testAsync}>Test</button>
    </div>
  );
}

function fetchPosts() {
  return function(dispatch, getState) {
    dispatch("IS_LOADING");
    return fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>{
        dispatch("IS_LOADED");
        return json;
      }
      )
  }
}

```

### Depends

 > react: ^16