import { Types } from '../actions/awsActions'
import { AWS_STATE } from '../state/awsState'
// import * as INT from '../../helpers/interfaces'




export default function awsReducer(state = AWS_STATE, action: any) {
  switch (action.type) {
    case Types.MAKE_SIGNUP_GLOBAL: {
      return {
        ...state,
        signup: action.signup
      }
    }
    default: {
      return state
    }
  }
}


