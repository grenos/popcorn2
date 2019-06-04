import * as INT from '../../helpers/interfaces'


export const Types: any = {
  GET_USER_INPUT_MOVIES_REQUEST: 'GET_USER_INPUT_MOVIES_REQUEST',
  GET_USER_INPUT_MOVIES_SUCCESS: 'GET_USER_INPUT_MOVIES_SUCCESS',
  GET_TOGGLE_MOVIES_REQUEST: 'GET_TOGGLE_MOVIES_REQUEST',
  GET_TOGGLE_MOVIES_SUCCESS: 'GET_TOGGLE_MOVIES_SUCCESS',
  GET_TOGGLE_SERIES_REQUEST: 'GET_TOGGLE_SERIES_REQUEST',
  GET_TOGGLE_SERIES_SUCCESS: 'GET_TOGGLE_SERIES_SUCCESS',
  GET_USER_INPUT_SERIES_REQUEST: 'GET_USER_INPUT_SERIES_REQUEST',
  GET_USER_INPUT_SERIES_SUCCESS: 'GET_USER_INPUT_SERIES_SUCCESS',
  GET_MOVIE_GENRES_REQUEST: 'GET_MOVIE_GENRES_REQUEST',
  GET_MOVIE_GENRES_SUCCESS: 'GET_MOVIE_GENRES_SUCCESS',
  GET_SERIE_GENRES_REQUEST: 'GET_SERIE_GENRES_REQUEST',
  GET_SERIE_GENRES_SUCCESS: 'GET_SERIE_GENRES_SUCCESS'
}



export const getUserInputMoviesRequest = (inputValue: string) => ({
  type: Types.GET_USER_INPUT_MOVIES_REQUEST,
  payload: inputValue
})
export const getUserInputMoviesSuccess = ({ result }: INT.ISearchMovies) => ({
  type: Types.GET_USER_INPUT_MOVIES_SUCCESS,
  payload: result
})


export const getUserInputSeriesRequest = (inputValue: string) => ({
  type: Types.GET_USER_INPUT_SERIES_REQUEST,
  payload: inputValue
})
export const getUserInputSeriesSuccess = ({ result }: INT.ISearchSeries) => ({
  type: Types.GET_USER_INPUT_SERIES_SUCCESS,
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



export const getMovieGenresRequest = () => ({
  type: Types.GET_MOVIE_GENRES_REQUEST
})
export const getMovieGenresSuccess = ({ result }: INT.IGenres) => ({
  type: Types.GET_MOVIE_GENRES_SUCCESS,
  payload: result
})


export const getSerieGenresRequest = () => ({
  type: Types.GET_SERIE_GENRES_REQUEST
})
export const getSerieGenresSuccess = ({ result }: INT.IGenres) => ({
  type: Types.GET_SERIE_GENRES_SUCCESS,
  payload: result
})
