import { Types } from '../actions/apiActions'
import { MOVIE_STATE } from '../state/moviesState'
// import * as INT from '../../helpers/interfaces'


export default function moviesReducer(state = MOVIE_STATE, action: any) {
  switch (action.type) {
    case Types.GET_USER_INPUT_MOVIES_SUCCESS: {
      return {
        ...state,
        searchMovies: action.payload
      }
    }
    case Types.GET_TOGGLE_MOVIES_SUCCESS: {
      return {
        ...state,
        topMovies: [...state.topMovies, ...action.payload]
      }
    }
    case Types.GET_MOVIE_GENRES_SUCCESS: {
      return {
        ...state,
        movieGenres: action.payload
      }
    }
    case Types.GET_MOVIE_BY_GENRE_SUCCESS: {

      if (state.movieCategoryId === action.id) {
        return {
          ...state,
          moviesByGenre: [...state.moviesByGenre, ...action.payload],
          movieCategoryId: action.id
        }
      } else {
        return {
          ...state,
          moviesByGenre: action.payload,
          movieCategoryId: action.id
        }
      }
    }
    case Types.CLEAR_MOVIES_BY_GENRES_STATE: {
      return {
        ...state,
        moviesByGenre: []
      }
    }
    default: {
      return state
    }
  }
}
