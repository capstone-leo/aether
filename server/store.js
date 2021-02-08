const { createStore, applyMiddleware } =  require('redux');
const thunk = require('redux-thunk').default;

const  reducer  = require('./reducers')
console.log(reducer)
 module.exports = createStore(reducer, applyMiddleware(thunk));
