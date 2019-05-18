import {createStore, connect, Provider, combineReducers} from './tinyRR.min'
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class TodoApp extends Component{
    constructor(props){
        super(props)
        this.state = {
            inputValue: ''
        }
    }
    updateValue = (e) =>{
        this.setState({inputValue: e.target.value})
    }
    updateTodos = (e) =>{
        
       this.props.addTodo(this.state.inputValue)
    }
    updateRMS = (e) =>{
        this.props.addRMS(this.state.inputValue)
    }
    render(){
        const {todos, rms} = this.props; 
        return (
            <div>
                <input value={this.state.inputValue} onChange={this.updateValue}></input>
                <br/>
                <button onClick={this.updateTodos}>Add Todo</button>
                <p>Todos:</p>
                {todos.map(item => <p>{item}</p>)}
                <button onClick={this.updateRMS}>Add RMS</button>
                <p>RMS:</p>
                {rms.map(item => <p>{item}</p>)}
            </div>
        )
    }
}





let todos = (state = [], action) => {
	switch(action.type){
  	case 'ADD_TODO': return [...state, action.data];
    default: return state;
  }
}

let rms = (state = [], action) =>{
    switch(action.type){
        case 'ADD_RMS': return [...state, action.data];
      default: return state;
}
}

function mapStateToProps(state){
    const {todos, rms} = state;
    return {todos, rms};
}

function mapDispatchToProps(dispatch){
    return {
        addTodo: (data)=> dispatch({type: 'ADD_TODO', data}),
        addRMS: (data)=> dispatch({type: 'ADD_RMS', data})
    }
}

let MyApp = connect(mapStateToProps, mapDispatchToProps)(TodoApp);

let myStore = createStore(combineReducers({todos, rms}));

ReactDOM.render(<Provider store={myStore}><MyApp /></Provider>, document.getElementById("root"))
 
