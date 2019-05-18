import { Types } from '../actions/apiActions'
import API_STATE from '../state/apiState'


export default function users(state = API_STATE, action: any) {
  switch (action.type) {
    case Types.GET_MOVIES_INPUT_REQUEST: {
      return {
        ...state,
      }
    }
    default: {
      return state
    }
  }
}
