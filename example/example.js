import React, { useReducer, useContext, useState } from "react";
import { render } from "react-dom";
import { useMiddleWare, combineReducers } from "../src/index";
import thunk from "redux-thunk";
import BookComponent from "./bookComponent";

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    default:
      return state;
  }
};

const bookReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOK":
      return [...state, action.payload];
    default:
      return state;
  }
};

const loadedReducer = (state, action) => {
  switch (action) {
    case "IS_LOADING":
      return true;
    case "IS_LOADED":
      return false;
    default:
      return state;
  }
};

const Reducers = combineReducers({
  Todos: todoReducer,
  Books: bookReducer,
  Loaded: loadedReducer
});

function App() {
  const AppContext = context;
  const [state, dispatch] = useReducer(Reducers, {
    Books: [],
    Todos: [],
    Loaded: false
  });
  const middle = useMiddleWare([thunk], { dispatch, state });

  const testAsync = e => {
    middle(fetchPosts());
  };

  console.log(state);

  return (
    <div>
      <AppContext.Provider value={{ state, dispatch: middle }}>
        <BookComponent />
        <TodoComponent />
        <button onClick={testAsync}>Test async</button>
        {state.Loaded ? <p>Loading</p> : <p>Loaded</p>}
      </AppContext.Provider>
    </div>
  );
}

function TodoComponent() {
  const { state, dispatch } = useContext(context);
  const [input, setInput] = useState("");
  function AddTodo(e) {
    e.persist();
    e.preventDefault();
    dispatch({ type: "ADD_TODO", payload: input });
  }

  function UpdateInput(e) {
    e.persist();
    setInput(input => e.target.value);
  }
  return (
    <div>
      <ul>
        {state.Todos.map(item => (
          <li>{item}</li>
        ))}
      </ul>
      <input onChange={UpdateInput}></input>
      <button onClick={AddTodo}>Click me</button>
    </div>
  );
}

render(<App />, document.getElementById("root"));

function fetchPosts() {
  return function(dispatch, getState) {
    dispatch("IS_LOADING");
    console.log(getState());
    return fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then(
        response => response.json(),
        error => console.log("An error occurred.", error)
      )
      .then(json => {
        dispatch("IS_LOADED");
        console.log(getState());
        return json;
      });
  };
}
