function combineReducers(reducers){
  return (state = {}, action) => {
      let reduced = Object.keys(reducers).reduce(
        (nextState, key)=>{
          nextState[key] = reducers[key](state[key], action);
          return nextState
        }, {}
      )
      return reduced;
  }
}

export default combineReducers;