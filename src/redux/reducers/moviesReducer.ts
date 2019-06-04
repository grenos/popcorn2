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
        topMovies: action.payload
      }
    }
    case Types.GET_MOVIE_GENRES_SUCCESS: {
      return {
        ...state,
        movieGenres: action.payload
      }
    }
    default: {
      return state
    }
  }
}
