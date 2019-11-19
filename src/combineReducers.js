function combineReducers(reducers) {
  return (state = {}, action) => {
    const reduced = Object.keys(reducers).reduce((nextState, key) => {
      const newState = nextState;
      newState[key] = reducers[key](state[key], action);
      return newState;
    }, {});
    return reduced;
  };
}

export default combineReducers;
