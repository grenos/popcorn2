import { IMovie } from '../state/apiState'


export const Types: any = {
  GET_USER_INPUT_REQUEST: 'action/get_user_input_request',
  GET_USER_INPUT_SUCCESS: 'action/get_user_input_success'
}

interface ISearchMovies {
  result: Array<IMovie>,
}

export const getUserInputRequest = (inputValue: string) => ({
  type: Types.GET_USER_INPUT_REQUEST,
  payload: inputValue
})

export const getUserInputSuccess = ({ result }: ISearchMovies) => ({
  type: Types.GET_USER_INPUT_SUCCESS,
  payload: result
})

