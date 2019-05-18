import { Types } from '../actions/apiActions'
import API_STATE from '../state/apiState'


export default function apiReducer(state = API_STATE, action: any) {
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
