import React from 'react';
import Context from '../components/Context';
import mapDispatchToProps from './mapDispatchToProps';
import mapStateToProps from './mapStateToProps';

function connect(mapState, mapDispatch){
  return (Component)=>{
    return function Wrapper(propsList){
      console.log(mapDispatch instanceof Function)
      return (
        <Context.Consumer>
        { 
         (context) =>
         {
         let newProps = mapStateToProps(propsList, mapState(context.getState()));
         console.log(context.dispatch)
         let newDispatch = (mapDispatch instanceof Function)? mapDispatchToProps(mapDispatch, context.dispatch, newProps) : {};
         console.log(newDispatch)
         return <Component {...newProps} getState={context.getState} dispatch={context.dispatch} {...newDispatch}/>
         }
        }   
        </Context.Consumer>
      )
    }
  }
}
  
export default connect;