import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import {createLogger} from 'redux-logger' // https://github.com/evgenyrodionov/redux-logger
import {composeWithDevTools} from 'redux-devtools-extension'

const middleware = composeWithDevTools(
  applyMiddleware(thunk, createLogger({collapsed: true}))
)

const store = createStore(reducer, middleware)
window.store = store

export default store
