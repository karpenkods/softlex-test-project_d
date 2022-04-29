import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import reducer from './reducer'

let redusers = combineReducers({ reducer })

let store = createStore(redusers, applyMiddleware(thunkMiddleware))

export default store
