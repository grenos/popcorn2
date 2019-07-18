import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import moviesReducer from './moviesReducer'
import seriesReducer from './seriesReducer'
import uiReducer from './uiReducer'
import awsReducer from './awsReducer'
import movieGenresReducer from './movieGenresReducer'
import serieGenresReducer from './serieGenresReducer'
// import favoritesReducer from './favoritesReducer'

export default (history: any) => combineReducers({
  router: connectRouter(history),
  awsReducer: awsReducer,
  moviesReducer: moviesReducer,
  seriesReducer: seriesReducer,
  movieGenresReducer: movieGenresReducer,
  serieGenresReducer: serieGenresReducer,
  uiReducer: uiReducer,
  // favoritesReducer: favoritesReducer
})
