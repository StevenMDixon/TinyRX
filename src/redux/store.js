function createStore (reducer, initialState={}){
    let reducers = reducer;
    let state = (Object.keys(initialState).length > 0 ? initialState: reducer(undefined, {type: ''}));
    const dispatch= (action) =>{
        state = reducers(state, action);
    }
    const getState = () => {return state}
    return {
        dispatch,
        getState
    }
}

export default createStore;