import { Types } from '../actions/apiActions'
import { API_STATE } from '../state/apiState'
import * as INT from '../../helpers/interfaces'




export default function apiReducer(state = API_STATE, action: INT.IActions) {
  switch (action.type) {
    case Types.GET_USER_INPUT_SUCCESS: {
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
