import { Types } from '../actions/apiActions'
import { MOVIE_STATE } from '../state/moviesState'
// import * as INT from '../../helpers/interfaces'


export default function moviesReducer(state = MOVIE_STATE, action: any) {
  switch (action.type) {
    case Types.GET_TOGGLE_MOVIES_SUCCESS: {
      return {
        ...state,
        topMovies: [...state.topMovies, ...action.payload]
      }
    }
    case Types.GET_MOVIE_INFO_SUCCESS: {
      return {
        ...state,
        movieInfo: { ...action.payload }
      }
    }
    case Types.GET_MOVIE_GENRES_SUCCESS: {
      return {
        ...state,
        movieGenres: action.payload
      }
    }
    case Types.CLEAR_MOVIES_BY_GENRES_STATE: {
      return {
        ...state,
        moviesByGenre: []
      }
    }
    case Types.GET_CAST_INFO_SUCCESS: {
      return {
        ...state,
        cast: action.payload
      }
    }
    case Types.GET_MOVIE_INFO_MODAL_SUCCESS: {
      return {
        ...state,
        movieInfoModal: { ...action.payload }
      }
    }
    case Types.GET_MOVIE_FAV_SUCCESS: {
      return {
        ...state,
        favMovies: [
          ...state.favMovies,
          {
            id: action.id,
            poster: action.poster,
            genreId: action.genreId
          }
        ]
      }
    }
    case Types.REMOVE_FAV_MOVIE_SUCCESS: {
      return {
        ...state,
        favMovies: state.favMovies.filter(item => action.id !== item.id)
      }
    }
    default: {
      return state
    }
  }
}

