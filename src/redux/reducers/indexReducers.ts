import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import moviesReducer from './moviesReducer'
import seriesReducer from './seriesReducer'
import uiReducer from './uiReducer'
import awsReducer from './awsReducer'
import movieGenresReducer from './movieGenresReducer'
import serieGenresReducer from './serieGenresReducer'
import searchMoviesReducer from './searchMoviesReducer'
import searchSeriesReducer from './searchSeriesReducer'
import { favoritesReducer } from './favoritesReducer'

import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'


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

const searchMoviesPersistConfig = {
  key: 'searchMoviesReducer',
  storage: storage,
  blacklist: [
    'router',
    'awsReducer',
    'searchSeriesReducer',
    'moviesReducer',
    'seriesReducer',
    'movieGenresReducer',
    'serieGenresReducer',
    'uiReducer',
    'favoritesReducer'
  ]
}

const searchSeriesPersistConfig = {
  key: 'searchSeriesReducer',
  storage: storage,
  blacklist: [
    'router',
    'awsReducer',
    'searchMoviesReducer',
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
    'searchSeries',
    'topSeries',
    'serieGenres',
    'serieInfo',
    'serieInfoModal'
  ]
}

const movieGenresPersistConfig = {
  key: 'movieGenresReducer',
  storage: storage,
  blacklist: [
    'action',
    'adventure',
    'animation',
    'comedy',
    'crime',
    'documentary',
    'drama',
    'family',
    'fantasy',
    'history',
    'horror',
    'music',
    'mystery',
    'romance',
    'science_fiction',
    'tv_movie',
    'thriller',
    'war',
    'western',
  ]
}

const serieGenresPersistConfig = {
  key: 'serieGenresReducer',
  storage: storage,
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
  searchMoviesReducer: persistReducer(searchMoviesPersistConfig, searchMoviesReducer),
  searchSeriesReducer: persistReducer(searchSeriesPersistConfig, searchSeriesReducer),
  moviesReducer: persistReducer(favMoviesPersistConfig, moviesReducer),
  seriesReducer: persistReducer(favSeriesPersistConfig, seriesReducer),
  movieGenresReducer: persistReducer(movieGenresPersistConfig, movieGenresReducer),
  serieGenresReducer: persistReducer(serieGenresPersistConfig, serieGenresReducer),
  uiReducer: uiReducer,
  favoritesReducer: persistReducer(favCatPersistConfig, favoritesReducer)
})
