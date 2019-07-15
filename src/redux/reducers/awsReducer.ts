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
    case Types.SAVE_USER_INFO: {
      return {
        ...state,
        userInfo: action.userInfo
      }
    }
    case Types.CLEAR_USER_INFO: {
      return {
        ...state,
        userInfo: {}
      }
    }
    case Types.IS_USER_SIGNED_IN: {
      return {
        ...state,
        isUserSignedIn: action.toggle
      }
    }
    default: {
      return state
    }
  }
}


