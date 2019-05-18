export const Types: any = {
  GET_USER_INPUT_REQUEST: 'users/get_user_input_request',
  GET_USER_INPUT_SUCCESS: 'users/get_user_input_success'
}

export const getUserInputRequest = (inputValue: string) => ({
  type: Types.GET_USER_INPUT_REQUEST,
  payload: inputValue
})

export const getUserInoutSuccess = () => ({
  type: Types.GET_USER_INPUT_SUCCESS
})

// gets passed as a parameter the array of users 
// that we are getting from the api
// export const getUsersSuccess = ({ items }) => ({
//   type: Types.GET_USERS_SUCCESS,
//   payload: { items }
// })

// export const createUserRequest = ({ firstName, lastName }) => ({
//   type: Types.CREATE_USER_REQUEST,
//   payload: { firstName, lastName, }
// })

// export const deleteUserRequest = (userId) => ({
//   type: Types.DELETE_USER_REQUEST,
//   payload: { userId }
// })

// export const userError = ({ error }) => ({
//   type: Types.USERS_ERROR,
//   payload: { error }
// })