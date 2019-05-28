import { combineReducers } from 'redux'
import moviesReducer from './moviesReducer'
import seriesReducer from './seriesReducer'
import uiReducer from './uiReducer'

export default combineReducers({
  moviesReducer: moviesReducer,
  seriesReducer: seriesReducer,
  uiReducer: uiReducer
})
