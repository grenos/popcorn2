import { combineReducers } from 'redux'
import apiReducer from './apiReducer'

export default combineReducers({
  users: apiReducer
})
