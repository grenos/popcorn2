import * as INT from '../../helpers/interfaces'


export const Types: any = {
  MAKE_SIGNUP_GLOBAL: 'MAKE_SIGNUP_GLOBAL',
  GET_SIGNUP_REQUEST: 'GET_SIGNUP_REQUEST',
  GET_SIGNUP_SUCCESS: 'GET_SIGNUP_SUCCESS'
}


export const makeSignUpGlobal = ({ ...signup }: INT.ISignupState) => ({
  type: Types.MAKE_SIGNUP_GLOBAL,
  signup
})

export const getSignUpRequest = () => ({
  type: Types.GET_SIGNUP_REQUEST,
})


export const getSignUpSuccess = () => ({
  type: Types.GET_SIGNUP_SUCCESS,
})


