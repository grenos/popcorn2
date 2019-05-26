import * as INT from '../../helpers/interfaces'


export const Types: any = {
  GET_USER_INPUT_MOVIES_REQUEST: 'GET_USER_INPUT_MOVIES_REQUEST',
  GET_USER_INPUT_MOVIES_SUCCESS: 'GET_USER_INPUT_MOVIES_SUCCESS',
  GET_TOGGLE_MOVIES_REQUEST: 'GET_TOGGLE_MOVIES_REQUEST',
  GET_TOGGLE_MOVIES_SUCCESS: 'GET_TOGGLE_MOVIES_SUCCESS',
  GET_TOGGLE_SERIES_REQUEST: 'GET_TOGGLE_SERIES_REQUEST',
  GET_TOGGLE_SERIES_SUCCESS: 'GET_TOGGLE_SERIES_SUCCESS'
}



export const getUserInputMoviesRequest = (inputValue: string) => ({
  type: Types.GET_USER_INPUT_MOVIES_REQUEST,
  payload: inputValue
})
export const getUserInputMoviesSuccess = ({ result }: INT.ISearchMovies) => ({
  type: Types.GET_USER_INPUT_MOVIES_SUCCESS,
  payload: result
})


export const getToggleMoviesRequest = (page: number) => ({
  type: Types.GET_TOGGLE_MOVIES_REQUEST,
  payload: page
})
export const getToggleMoviesSuccess = ({ result }: INT.ISearchMovies) => ({
  type: Types.GET_TOGGLE_MOVIES_SUCCESS,
  payload: result
})


export const getToggleSeriesRequest = (page: number) => ({
  type: Types.GET_TOGGLE_SERIES_REQUEST,
  payload: page
})
export const getToggleSeriesSuccess = ({ result }: INT.ISearchSeries) => ({
  type: Types.GET_TOGGLE_SERIES_SUCCESS,
  payload: result
})



