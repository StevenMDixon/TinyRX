function middleware(middleware, context) {
  let cur = -1;

  let getState = () => context.state;
  let dispatch = context.dispatch;

  function next(action){
    if(cur+1 >= middleware.length){
      return dispatch(action);
    }
    cur +=1;
    return middleware[cur]({dispatch, getState})(next)(action);
  }

  return next;
}

export default middleware;
