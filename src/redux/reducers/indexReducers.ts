import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import moviesReducer from './moviesReducer'
import seriesReducer from './seriesReducer'
import uiReducer from './uiReducer'
import awsReducer from './awsReducer'
import movieGenresReducer from './movieGenresReducer'
import serieGenresReducer from './serieGenresReducer'
import { favoritesReducer } from './favoritesReducer'

import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
// import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const authPersistConfig = {
  key: 'awsReducer',
  storage: storage,
  blacklist: [
    'router',
    'moviesReducer',
    'seriesReducer',
    'movieGenresReducer',
    'serieGenresReducer',
    'uiReducer',
    'favoritesReducer'
  ]
}

const favCatPersistConfig = {
  key: 'favoritesReducer',
  storage: storage,
  blacklist: [
    'router',
    'moviesReducer',
    'seriesReducer',
    'movieGenresReducer',
    'serieGenresReducer',
    'uiReducer',
    'awsReducer'
  ]
}

const favMoviesPersistConfig = {
  key: 'favMovies',
  storage: storage,
  blacklist: [
    'searchMovies',
    'topMovies',
    'movieGenres',
    'movieInfo',
    'movieInfoModal',
    'cast'
  ]
}

const favSeriesPersistConfig = {
  key: 'favSeries',
  storage: storage,
  blacklist: [
    'searchSeriesd',
    'topSeries',
    'serieGenres',
    'serieInfo',
    'serieInfoModal'
  ]
}

const movieGenresPersistConfig = {
  key: 'movieGenresReducer',
  storage: storage,
  // stateReconciler: hardSet,
  blacklist: [
    'router',
    'moviesReducer',
    'seriesReducer',
    'awsReducer',
    'serieGenresReducer',
    'uiReducer',
    'favoritesReducer'
  ]
}

const serieGenresPersistConfig = {
  key: 'serieGenresReducer',
  storage: storage,
  // stateReconciler: hardSet,
  blacklist: [
    'router',
    'moviesReducer',
    'seriesReducer',
    'movieGenresReducer',
    'awsReducer',
    'uiReducer',
    'favoritesReducer'
  ]
}




export default (history: any) => combineReducers({
  router: connectRouter(history),
  awsReducer: persistReducer(authPersistConfig, awsReducer),
  moviesReducer: persistReducer(favMoviesPersistConfig, moviesReducer),
  seriesReducer: persistReducer(favSeriesPersistConfig, seriesReducer),
  movieGenresReducer: persistReducer(movieGenresPersistConfig, movieGenresReducer),
  serieGenresReducer: persistReducer(serieGenresPersistConfig, serieGenresReducer),
  uiReducer: uiReducer,
  favoritesReducer: persistReducer(favCatPersistConfig, favoritesReducer)
})
