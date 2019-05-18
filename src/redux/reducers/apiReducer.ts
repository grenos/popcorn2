import { Types } from '../actions/apiActions'
import { IMovie, API_STATE } from '../state/apiState'

interface IActions {
  type: string,
  payload: Array<IMovie>,
}

export default function apiReducer(state = API_STATE, action: IActions) {
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
