import * as INT from '../../helpers/interfaces'


export const Types: any = {
  MAKE_SIGNUP_GLOBAL: 'MAKE_SIGNUP_GLOBAL',
  SAVE_USER_INFO: 'SAVE_USER_INFO',
  IS_USER_SIGNED_IN: 'IS_USER_SIGNED_IN'
}


export const makeSignUpGlobal = ({ ...signup }: INT.ISignupState) => ({
  type: Types.MAKE_SIGNUP_GLOBAL,
  signup
})

export const saveUserInfo = (userInfo: any) => ({
  type: Types.SAVE_USER_INFO,
  userInfo
})

export const userSignedIn = (toggle: boolean) => ({
  type: Types.IS_USER_SIGNED_IN,
  toggle
})


