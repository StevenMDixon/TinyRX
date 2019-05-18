import React from 'react';
import Context from './Context'

class Provider extends React.Component {
    constructor(props) {
      super(props)
      const { store } = props;
      this.state = {
        ...store
      }
    }
    componentDidMount(){
      this.setState({...this.state.getState(), ...this.state})
    }
    dispatch = (payload) =>{
      this.state.dispatch(payload);
      this.setState({...this.state, ...this.state.getState()}, ()=>console.log(this.state));
    }
    render() {
      let {children} = this.props;
      let value = {...this.state, dispatch: this.dispatch}
      const TinyContext = this.props.context || Context;
      return (
        <TinyContext.Provider value={value}>
        {children}
        </TinyContext.Provider>
      )
    }
  }

  export default Provider;