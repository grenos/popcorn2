import { Types } from '../actions/apiActions'
import { API_STATE } from '../state/apiState'
import * as INT from '../../helpers/interfaces'




export default function apiReducer(state = API_STATE, action: INT.IReducerActions) {
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
    default: {
      return state
    }
  }
}
