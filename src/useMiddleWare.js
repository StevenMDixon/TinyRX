

function useMiddleWare(middleware, context) {
  let cur = -1;
  const getState = () => context.state;
  const { dispatch } = context;

  function next(action) {
    cur += 1;
    if (cur >= middleware.length) {
      return dispatch(action);
    }
    return middleware[cur]({ dispatch, getState })(next)(action);
  }

  return { state: context.state, dispatch: next };
}

export default useMiddleWare;
