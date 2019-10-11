# TinyRX (react-redux)

:pill: TinyRX is an interface library to add middleware and React-Redux like reducing to Reacts hook system.

## What does tinyRX do

TinyRX adds the missing features into reacts current useReducer landscape

Adds: 

- Combine Reducers
- useMiddleWare

## Use

Adding TinyRX to Your Project is simple!

```JavaScript

import {useMiddleWare, context, combineReducers} from 'tinyrx';

```

Out of the box tinyRX proves a context for your useContext hook, however feel free to define your own!

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
const Reducers = combineReducers({Todos: todoReducer, Books: bookReducer});
// warning just like with redux if both reducers have the same Key or Type both will be affected

function App () {
  const AppContext = context;
  const [state, dispatch] = useReducer(Reducers, {Books: [], Todos: []});

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
  const {state, dispatch} = useContext(context);
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
  const middle = useMiddleWare([thunk], {dispatch, state});
  const testAsync = e =>{middle(fetchPosts())};
  return (
    <div>
      <AppContext.Provider value={{state, dispatch: middle}}>
        <button onClick={testAsync}>Test async</button>
        {state.Loaded? <p>Loading</p>: <p>Loaded</p>}
      </AppContext.Provider>
    </div>
  )
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