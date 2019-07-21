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
  GET_SERIE_GENRES_SUCCESS: 'GET_SERIE_GENRES_SUCCESS',
  GET_MOVIE_BY_GENRE_REQUEST: 'GET_MOVIE_BY_GENRE_REQUEST',
  GET_MOVIE_BY_GENRE_SUCCESS: 'GET_MOVIE_BY_GENRE_SUCCESS',
  GET_SERIE_BY_GENRE_REQUEST: 'GET_SERIE_BY_GENRE_REQUEST',
  GET_SERIE_BY_GENRE_SUCCESS: 'GET_SERIE_BY_GENRE_SUCCESS',
  CLEAR_MOVIES_BY_GENRES_STATE: 'CLEAR_MOVIES_BY_GENRES_STATE',
  CLEAR_SERIES_BY_GENRES_STATE: 'CLEAR_SERIES_BY_GENRES_STATE',
  GET_MOVIE_INFO_REQUEST: 'GET_MOVIE_INFO_REQUEST',
  GET_MOVIE_INFO_SUCCESS: 'GET_MOVIE_INFO_SUCCESS',
  GET_MOVIE_INFO_MODAL_REQUEST: 'GET_MOVIE_INFO_MODAL_REQUEST',
  GET_MOVIE_INFO_MODAL_SUCCESS: 'GET_MOVIE_INFO_MODAL_SUCCESS',
  GET_SERIE_INFO_REQUEST: 'GET_SERIE_INFO_REQUEST',
  GET_SERIE_INFO_SUCCESS: 'GET_SERIE_INFO_SUCCESS',
  GET_CAST_INFO_REQUEST: 'GET_CAST_INFO_REQUEST',
  GET_CAST_INFO_SUCCESS: 'GET_CAST_INFO_SUCCESS',
  GET_SERIE_INFO_MODAL_REQUEST: 'GET_SERIE_INFO_MODAL_REQUEST',
  GET_SERIE_INFO_MODAL_SUCCESS: 'GET_SERIE_INFO_MODAL_SUCCESS',
  GET_MOVIE_FAV_REQUEST: 'GET_MOVIE_FAV_REQUEST',
  GET_SERIE_FAV_REQUEST: 'GET_SERIE_FAV_REQUEST',
  GET_MOVIE_FAV_SUCCESS: 'GET_MOVIE_FAV_SUCCESS',
  GET_SERIE_FAV_SUCCESS: 'GET_SERIE_FAV_SUCCESS',
  REMOVE_FAV_MOVIE_REQUEST: 'REMOVE_FAV_MOVIE_REQUEST',
  REMOVE_FAV_MOVIE_SUCCESS: 'REMOVE_FAV_MOVIE_SUCCESS',
  REMOVE_FAV_SERIE_REQUEST: 'REMOVE_FAV_SERIE_REQUEST',
  REMOVE_FAV_SERIE_SUCCESS: 'REMOVE_FAV_SERIE_SUCCESS',
  CATEGORIZE_FAV_ARRAYS: 'CATEGORIZE_FAV_ARRAYS',
  REMOVE_FAV_CATEGORIES_SUCCESS: 'REMOVE_FAV_CATEGORIES_SUCCESS'
}



export const getUserInputMoviesRequest = (inputValue: string) => ({
  type: Types.GET_USER_INPUT_MOVIES_REQUEST,
  inputValue
})
export const getUserInputMoviesSuccess = ({ result }: INT.ISearchMovies) => ({
  type: Types.GET_USER_INPUT_MOVIES_SUCCESS,
  payload: result
})



export const getUserInputSeriesRequest = (inputValue: string) => ({
  type: Types.GET_USER_INPUT_SERIES_REQUEST,
  inputValue
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
export const getMovieGenresSuccess = ({ result }: INT.IGenresAction) => ({
  type: Types.GET_MOVIE_GENRES_SUCCESS,
  payload: result
})



export const getSerieGenresRequest = () => ({
  type: Types.GET_SERIE_GENRES_REQUEST
})
export const getSerieGenresSuccess = ({ result }: INT.IGenresAction) => ({
  type: Types.GET_SERIE_GENRES_SUCCESS,
  payload: result
})



export const getMoviesByGenreRequest = (id: number, page: number, name: string): INT.IGetByGenreSagaProps => ({
  type: Types.GET_MOVIE_BY_GENRE_REQUEST,
  id,
  page,
  name
})
export const getMoviesByGenreSuccess = ({ result, id, name }: INT.ISearchMovies) => ({
  type: Types.GET_MOVIE_BY_GENRE_SUCCESS,
  payload: result,
  id,
  name
})



export const getSeriesByGenreRequest = (id: number, page: number, name: string): INT.IGetByGenreSagaProps => ({
  type: Types.GET_SERIE_BY_GENRE_REQUEST,
  id,
  page,
  name
})
export const getSeriesByGenreSuccess = ({ result, id, name }: INT.ISearchSeries) => ({
  type: Types.GET_SERIE_BY_GENRE_SUCCESS,
  payload: result,
  id,
  name
})




export const getMovieInfoRequest = (id: number): INT.ISearchMovieInfo => ({
  type: Types.GET_MOVIE_INFO_REQUEST,
  id
})
export const getMovieInfoSuccess = ({ result, id }: INT.ISearchMovieInfoResults) => ({
  type: Types.GET_MOVIE_INFO_SUCCESS,
  payload: result,
  id
})


export const getSerieInfoRequest = (id: number): INT.ISearchMovieInfo => ({
  type: Types.GET_SERIE_INFO_REQUEST,
  id
})
export const getSerieInfoSuccess = ({ result, id }: INT.ISearchMovieInfoResults) => ({
  type: Types.GET_SERIE_INFO_SUCCESS,
  payload: result,
  id
})


export const getCastRequest = (id: number): INT.ISearchMovieInfo => ({
  type: Types.GET_CAST_INFO_REQUEST,
  id
})
export const getCastSuccess = ({ result, id }: INT.ISearchCastResults) => ({
  type: Types.GET_CAST_INFO_SUCCESS,
  payload: result,
  id
})


export const getMovieInfoModalRequest = (id: number, title: string): INT.ISearchMovieInfoModal => ({
  type: Types.GET_MOVIE_INFO_MODAL_REQUEST,
  id,
  title
})
export const getMovieInfoModalSuccess = ({ result, id }: INT.ISearchMovieInfoResults) => ({
  type: Types.GET_MOVIE_INFO_MODAL_SUCCESS,
  payload: result,
  id
})


export const getSerieInfoModalRequest = (id: number, title: string): INT.ISearchMovieInfoModal => ({
  type: Types.GET_SERIE_INFO_MODAL_REQUEST,
  id,
  title
})
export const getSerieInfoModalSuccess = ({ result, id }: INT.ISearchMovieInfoResults) => ({
  type: Types.GET_SERIE_INFO_MODAL_SUCCESS,
  payload: result,
  id
})



export const getMovieFavoriteRequest = ({ id, poster, genreId, title }: INT.IFavMovie): INT.IFavMovieAction => ({
  type: Types.GET_MOVIE_FAV_REQUEST,
  id,
  poster,
  genreId,
  title
})
export const getMovieFavoriteSuccess = ({ id, poster, genreId }: INT.IFavMovie): INT.IFavMovieAction => ({
  type: Types.GET_MOVIE_FAV_SUCCESS,
  id,
  poster,
  genreId
})
export const removeFavMovieRequest = (id: number, genreId: number) => ({
  type: Types.REMOVE_FAV_MOVIE_REQUEST,
  id,
  genreId
})
export const removeFavMovieSuccess = (id: number) => ({
  type: Types.REMOVE_FAV_MOVIE_SUCCESS,
  id
})



export const getSerieFavoriteRequest = ({ id, poster, genreId, name }: INT.IFavMovie): INT.IFavMovieAction => ({
  type: Types.GET_SERIE_FAV_REQUEST,
  id,
  poster,
  genreId,
  title: name
})
export const getSerieFavoriteSuccess = ({ id, poster, genreId }: INT.IFavMovie): INT.IFavMovieAction => ({
  type: Types.GET_SERIE_FAV_SUCCESS,
  id,
  poster,
  genreId
})
export const removeFavSerieRequest = (id: number, genreId: number) => ({
  type: Types.REMOVE_FAV_SERIE_REQUEST,
  id,
  genreId
})
export const removeFavSerieSuccess = (id: number) => ({
  type: Types.REMOVE_FAV_SERIE_SUCCESS,
  id
})






export const categorizeArrays = ({ id, poster, genreId, title }: INT.IFavMovie): INT.IFavMovieAction => ({
  type: Types.CATEGORIZE_FAV_ARRAYS,
  id,
  poster,
  genreId,
  title
})
export const removeFromFavCategories = (id: number, genreId: number) => ({
  type: Types.REMOVE_FAV_CATEGORIES_SUCCESS,
  id,
  genreId
})





export const clearMoviesByGenreState = () => ({
  type: Types.CLEAR_MOVIES_BY_GENRES_STATE
})
export const clearSeriesByGenreState = () => ({
  type: Types.CLEAR_SERIES_BY_GENRES_STATE
})





