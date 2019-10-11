import React, { useContext, useState } from "react";
import { context } from "../src";

function BookComponent() {
  const { state, dispatch } = useContext(context);
  const [input, setInput] = useState("");
  function AddBook(e) {
    e.persist();
    e.preventDefault();
    dispatch({ type: "ADD_BOOK", payload: input });
  }

  function UpdateInput(e) {
    e.persist();
    setInput(() => e.target.value);
  }
  return (
    <div>
      <ul>
        {state.Books.map(item => (
          <li>{item}</li>
        ))}
      </ul>
      <input onChange={UpdateInput}></input>
      <button onClick={AddBook}>Click me</button>
    </div>
  );
}

export default BookComponent;
