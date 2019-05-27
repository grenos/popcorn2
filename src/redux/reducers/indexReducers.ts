import { combineReducers } from 'redux'
import moviesReducer from './moviesReducer'
import seriesReducer from './seriesReducer'

export default combineReducers({
  moviesReducer: moviesReducer,
  seriesReducer: seriesReducer
})
