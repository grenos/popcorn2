import * as INT from '../../helpers/interfaces'


export const Types: any = {
  GET_USER_INPUT_MOVIES_REQUEST: 'GET_USER_INPUT_MOVIES_REQUEST',
  GET_USER_INPUT_MOVIES_SUCCESS: 'GET_USER_INPUT_MOVIES_SUCCESS',
  GET_TOGGLE_MOVIES_REQUEST: 'GET_TOGGLE_MOVIES_REQUEST',
  GET_TOGGLE_SERIES_REQUEST: 'GET_TOGGLE_SERIES_REQUEST'
}



export const getUserInputMoviesRequest = (inputValue: string) => ({
  type: Types.GET_USER_INPUT_MOVIES_REQUEST,
  payload: inputValue
})

export const getUserInputMoviesSuccess = ({ result }: INT.ISearchMovies) => ({
  type: Types.GET_USER_INPUT_MOVIES_SUCCESS,
  payload: result
})


export const getToggleMoviesRequest = () => ({
  type: Types.GET_TOGGLE_MOVIES_REQUEST
})

export const getToggleSeriesRequest = () => ({
  type: Types.GET_TOGGLE_SERIES_REQUEST
})

