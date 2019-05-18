# TinyRR (react-redux)

87 line implementation of `connect`, `Provider`, `createStore`, `combineReducers`.

works almost exactly the same as React-Redux.  missing tree shaking and general performance enhancing code. this is more like a proof of concept.

## Installation

copy tinyRR.min.js into your project and import what you need. 

this package has not been minified, I just stuck all of the functions in one file.

## Usage

Usage is the exact same as it would be if using React-Redux

```JavaScript

//create a store for redux
const yourStore= createStore(whateverProviderYoudefined);

//wrap your components in Provider and provide the store
<Provider store={yourStore}><SomeComponent /></Provider>

//Define your props and dispatchers the pass in your component
let yourWrappedComponent = connect(stateToProps, disptatchToProps)(yourComponent)

```

### Depends

 > react: ^16