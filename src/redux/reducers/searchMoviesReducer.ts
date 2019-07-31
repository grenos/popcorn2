import { Types } from '../actions/apiActions'
import { SEARCH_MOVIES_STATE } from '../state/searchMoviesState'



export default function moviesReducer(state = SEARCH_MOVIES_STATE, action: any) {
  switch (action.type) {
    case Types.GET_USER_INPUT_MOVIES_SUCCESS: {
      return {
        ...state,
        searchMovies: action.payload
      }
    }
    default: {
      return state
    }
  }
}

