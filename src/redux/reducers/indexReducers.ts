import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import moviesReducer from './moviesReducer'
import seriesReducer from './seriesReducer'
import uiReducer from './uiReducer'
import movieGenresReducer from './movieGenresReducer'


export default (history: any) => combineReducers({
  router: connectRouter(history),
  moviesReducer: moviesReducer,
  seriesReducer: seriesReducer,
  movieGenresReducer: movieGenresReducer,
  uiReducer: uiReducer
})
