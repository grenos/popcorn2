
import { takeLatest, call, fork, put, takeEvery, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import * as actions from '../actions/apiActions'
import * as actionsUI from '../actions/uiActions'
import * as api from '../api/apiCalls'
import * as INT from '../../helpers/interfaces'
import { makeDashesUrl } from '../../helpers/helperFunctions'
import * as selectors from './selectors';




function* watchGetUsersMoviesRequest() {
  yield takeLatest(actions.Types.GET_USER_INPUT_MOVIES_REQUEST, getUserInputMovies)
}
/**
 * handles Input serach results
 * @generator
 * @param {string} inputValue - What the user has written in input
 * @yields {function} Action - isFetchingTopItemReq
 * @yields {function} API call - getUserInputMovies @returns {result}
 * @yields {function} Action - getUserInputMoviesSuccess - store to state
 * @yields {function} PUSH - push to network error page
 * @yields {function} Action - ErrorTopItemReq store error info to state
 */
function* getUserInputMovies({ inputValue }: INT.IInputSagaProps) {
  try {
    yield put(actionsUI.isFetchingTopItemReq(true))
    const result = yield call(api.getUserInputMovies, inputValue)
    yield put(actions.getUserInputMoviesSuccess({
      result: result.data.results
    } as INT.ISearchMovies))
    yield put(actionsUI.isFetchingTopItemReq(false))
  } catch (e) {
    yield put(actionsUI.isFetchingTopItemReq(false))
    yield put(push(`/error`))
    yield put(actionsUI.ErrorTopItemReq(e))
    console.log(e);
  }
}

function* watchGetUsersSeriesRequest() {
  yield takeLatest(actions.Types.GET_USER_INPUT_SERIES_REQUEST, getUserInputSeries)
}
/**
 * handles Input serach results
 * @generator
 * @param {string} inputValue - What the user has written in input
 * @yields {function} Action - isFetchingTopItemReq 
 * @yields {function} API call - getUserInputSeries @returns {result}
 * @yields {function} Action - getUserInputSeriesSuccess - store to state
 * @yields {function} PUSH - push to network error page
 * @yields {function} Action - ErrorTopItemReq store error info to state
 */
function* getUserInputSeries({ inputValue }: INT.IInputSagaProps) {
  try {
    yield put(actionsUI.isFetchingTopItemReq(true))
    const result = yield call(api.getUserInputSeries, inputValue)
    yield put(actions.getUserInputSeriesSuccess({
      result: result.data.results
    } as INT.ISearchSeries))
    yield put(actionsUI.isFetchingTopItemReq(false))
  } catch (e) {
    yield put(actionsUI.isFetchingTopItemReq(false))
    yield put(push(`/error`))
    yield put(actionsUI.ErrorTopItemReq(e))
    console.log(e);
  }
}






function* watchGetMovieInfoRequest() {
  yield takeLatest(actions.Types.GET_MOVIE_INFO_REQUEST, getMoviesInfo)
}
/**
 * handles indivisual item info
 * @generator
 * @param {number} id - id of selected item
 * @yields {function} API call - getMovieInfo @returns {result}
 * @yields {function} Action - getMovieInfoSuccess - store to state
 * @yields {function} PUSH - push to network error page
 * @yields {function} Action - ErrorTopItemReq store error info to state
 */
function* getMoviesInfo({ id }: INT.IMovieInfoSagaProps) {
  try {
    const result = yield call(api.getMovieInfo, id)
    yield put(actions.getMovieInfoSuccess({
      result: result.data
    } as INT.ISearchMovieInfoResults))
  } catch (e) {
    yield put(push(`/error`))
    yield put(actionsUI.ErrorTopItemReq(e))
    console.log(e)
  }
}

function* watchGetSerieInfoRequest() {
  yield takeLatest(actions.Types.GET_SERIE_INFO_REQUEST, getSeriesInfo)
}
/**
 * handles indivisual item info
 * @generator
 * @param {number} id - id of selected item
 * @yields {function} API call - getSerieInfo @returns {result}
 * @yields {function} Action - getSerieInfoSuccess - store to state
 * @yields {function} PUSH - push to network error page
 * @yields {function} Action - ErrorTopItemReq store error info to state
 */
function* getSeriesInfo({ id }: INT.IMovieInfoSagaProps) {
  try {
    const result = yield call(api.getSerieInfo, id)
    yield put(actions.getSerieInfoSuccess({
      result: result.data
    } as INT.ISearchMovieInfoResults))
  } catch (e) {
    yield put(push(`/error`))
    yield put(actionsUI.ErrorTopItemReq(e))
    console.log(e);
  }
}




function* watchGetToggleMoviesRequest() {
  yield takeEvery(actions.Types.GET_TOGGLE_MOVIES_REQUEST, getToggleMovies)
}
/**
 * handles pagination of top items (movies)
 * @generator
 * @param {number} page - number for pagination 
 * @yields {function} Action - isFetchingTopItemReq - spinner
 * @yields {function} API call - getToggleMovies @returns {result}
 * @yields {function} Action - getToggleMoviesSuccess - store to state
 * @yields {function} PUSH - push to network error page
 * @yields {function} Action - ErrorTopItemReq store error info to state
 */
function* getToggleMovies({ payload: page }: INT.IToggleSagaProps) {
  try {
    yield put(actionsUI.isFetchingTopItemReq(true))
    const result = yield call(api.getToggleMovies, page)
    yield put(actions.getToggleMoviesSuccess({
      result: result.data.results
    } as INT.ISearchMovies))
    yield put(actionsUI.isFetchingTopItemReq(false))
  } catch (error) {
    yield put(actionsUI.isFetchingTopItemReq(false))
    yield put(push(`/error`))
    yield put(actionsUI.ErrorTopItemReq(error))
    console.log(error);
  }
}

function* watchGetToggleSeiresRequest() {
  yield takeEvery(actions.Types.GET_TOGGLE_SERIES_REQUEST, getToggleSeries)
}
/**
 * handles pagination of top items (series)
 * @generator
 * @param {number} page - number for pagination 
 * @yields {function} Action - isFetchingTopItemReq - spinner
 * @yields {function} API call - getToggleMovies @returns {result}
 * @yields {function} Action - getToggleMoviesSuccess - store to state
 * @yields {function} PUSH - push to network error page
 * @yields {function} Action - ErrorTopItemReq store error info to state
 */
function* getToggleSeries({ payload: page }: INT.IToggleSagaProps) {
  try {
    yield put(actionsUI.isFetchingTopItemReq(true))
    const result = yield call(api.getToggleSeries, page)
    yield put(actions.getToggleSeriesSuccess({
      result: result.data.results
    } as INT.ISearchSeries))
    yield put(actionsUI.isFetchingTopItemReq(false))
  } catch (error) {
    yield put(actionsUI.isFetchingTopItemReq(false))
    yield put(push(`/error`))
    yield put(actionsUI.ErrorTopItemReq(error))
    console.log(error);
  }
}





function* watchgetMovieGenresRequest() {
  yield takeLatest(actions.Types.GET_MOVIE_GENRES_REQUEST, getMovieGenres)
}
/**
 * get movie genres
 * @generator
 * @yields {function} API call - getMovieGenres @returns {result}
 * @yields {function} Action - getMovieGenresSuccess - store to state
 * @yields {function} PUSH - push to network error page
 * @yields {function} Action - ErrorTopItemReq store error info to state
 */
function* getMovieGenres() {
  try {
    const result = yield call(api.getMovieGenres)
    yield put(actions.getMovieGenresSuccess({
      result: result.data.genres
    } as INT.IGenresAction))
  } catch (e) {
    yield put(push(`/error`))
    yield put(actionsUI.ErrorTopItemReq(e))
    console.log(e);
  }
}

function* watchgetSerieGenresRequest() {
  yield takeLatest(actions.Types.GET_SERIE_GENRES_REQUEST, getSerieGenres)
}
/**
 * get movie genres
 * @generator
 * @yields {function} API call - getSerieGenres @returns {result}
 * @yields {function} Action - getSerieGenresSuccess - store to state
 * @yields {function} PUSH - push to network error page
 * @yields {function} Action - ErrorTopItemReq store error info to state
 */
function* getSerieGenres() {
  try {
    const result = yield call(api.getSerieGenres)
    yield put(actions.getSerieGenresSuccess({
      result: result.data.genres
    } as INT.IGenresAction))
  } catch (e) {
    yield put(push(`/error`))
    yield put(actionsUI.ErrorTopItemReq(e))
    console.log(e);
  }
}







function* watchGetMoviesByGenreRequest() {
  yield takeEvery(actions.Types.GET_MOVIE_BY_GENRE_REQUEST, getMoviesByGenre)
}
/**
 * handles category and pagination of items' specific genre
 * @generator
 * @param {number} id - genre id
 * @param {number} page - number for pagination 
 * @param {string} name - title used for URL
 * @yields {function} Action - isFetchingTopItemReq - spinner
 * @yields {function} API call - getMoviesByGenre @returns {result}
 * @yields {function} Action - getMoviesByGenreSuccess - store to state
 * @yields {function} PUSH - push to network error page
 * @yields {function} Action - ErrorTopItemReq store error info to state
 */
function* getMoviesByGenre({ id, page, name }: INT.IGetByGenreSagaProps) {
  try {
    yield put(actionsUI.isFetchingTopItemReq(true))
    const result = yield call(api.getMoviesByGenre, id, page)
    yield put(actions.getMoviesByGenreSuccess({
      result: result.data.results,
      id,
      name
    } as INT.ISearchMovies))
    yield put(actionsUI.isFetchingTopItemReq(false))
  } catch (e) {
    yield put(actionsUI.isFetchingTopItemReq(false))
    yield put(push(`/error`))
    yield put(actionsUI.ErrorTopItemReq(true))
    console.log(e)
  }
}

function* watchGetSeriesByGenreRequest() {
  yield takeLatest(actions.Types.GET_SERIE_BY_GENRE_REQUEST, getSeriesByGenre)
}
/**
 * handles category and pagination of items' specific genre
 * @generator
 * @param {number} id - genre id
 * @param {number} page - number for pagination 
 * @param {string} name - title used for URL
 * @yields {function} Action - isFetchingTopItemReq - spinner
 * @yields {function} API call - getSeriesByGenre @returns {result}
 * @yields {function} Action - getSeriesByGenreSuccess - store to state
 * @yields {function} PUSH - push to network error page
 * @yields {function} Action - ErrorTopItemReq store error info to state
 */
function* getSeriesByGenre({ id, page, name }: INT.IGetByGenreSagaProps) {
  try {
    yield put(actionsUI.isFetchingTopItemReq(true))
    const result = yield call(api.getSeriesByGenre, id, page)
    yield put(actions.getSeriesByGenreSuccess({
      result: result.data.results,
      id,
      name
    } as INT.ISearchSeries))
    yield put(actionsUI.isFetchingTopItemReq(false))
  } catch (e) {
    yield put(actionsUI.isFetchingTopItemReq(false))
    yield put(push(`/error`))
    yield put(actionsUI.ErrorTopItemReq(true))
    console.log(e)
  }
}






function* watchGetCastInfoRequest() {
  yield takeLatest(actions.Types.GET_CAST_INFO_REQUEST, getCastInfo)
}
/**
 * get cast on selected item (movie)
 * @generator
 * @param {number} id - item id
 * @yields {function} API call - getCast @returns {result}
 * @yields {function} Action - getCastSuccess - store to state
 * @yields {function} PUSH - push to network error page
 * @yields {function} Action - ErrorTopItemReq store error info to state
 */
function* getCastInfo({ id }: INT.IMovieInfoSagaProps) {
  try {
    const result = yield call(api.getCast, id)
    yield put(actions.getCastSuccess({
      result: result.data.cast
    } as INT.ISearchCastResults))
  } catch (e) {
    yield put(push(`/error`))
    yield put(actionsUI.ErrorTopItemReq(e))
    console.log(e);
  }
}






function* watchGetMovieInfoModalRequest() {
  yield takeLatest(actions.Types.GET_MOVIE_INFO_MODAL_REQUEST, getMoviesInfoModal)
}
/**
 * get more info on selected item
 * @generator
 * @param {number} id - item id
 * @param {string} title - item title
 * @yields {function} API call - getMovieInfo @returns {result}
 * @yields {function} Action - getMovieInfoModalSuccess - store to state
 * @yields {function} PUSH - push to title page on succes of data (after storage to state)
 * @yields {function} PUSH - push to network error page
 * @yields {function} UI-Action openSimilarSectionRequest (if clicked from movie modal - close modal)
 * @yields {function} Action - ErrorTopItemReq store error info to state
 */
function* getMoviesInfoModal({ id, title }: INT.IMovieInfoSagaProps) {
  try {
    const result = yield call(api.getMovieInfo, id)
    yield put(actions.getMovieInfoModalSuccess({
      result: result.data
    } as INT.ISearchMovieInfoResults))
    const data = yield select(selectors.getInfoModalM)
    if (data) {
      yield put(push(`/title/${makeDashesUrl(title)}`))
    }
    yield put(actionsUI.openSimilarSectionRequest(false))
  } catch (e) {
    yield put(push(`/error`))
    yield put(actionsUI.ErrorTopItemReq(e))
    console.log(e);
  }
}

function* watchGetSerieInfoModalRequest() {
  yield takeLatest(actions.Types.GET_SERIE_INFO_MODAL_REQUEST, getSeriesInfoModal)
}
/**
 * get more info on selected item
 * @generator
 * @param {number} id - item id
 * @param {string} title - item title
 * @yields {function} API call - getMovieInfo @returns {result}
 * @yields {function} Action - getMovieInfoModalSuccess - store to state
 * @yields {function} PUSH - push to title page on succes of data (after storage to state)
 * @yields {function} PUSH - push to network error page
 * @yields {function} UI-Action openSimilarSectionRequest (if clicked from movie modal - close modal)
 * @yields {function} Action - ErrorTopItemReq store error info to state
 */
function* getSeriesInfoModal({ id, title }: INT.IMovieInfoSagaProps) {
  try {
    const result = yield call(api.getSerieInfo, id)
    yield put(actions.getSerieInfoModalSuccess({
      result: result.data
    } as INT.ISearchMovieInfoResults))
    const data = yield select(selectors.getInfoModalS)
    if (data) {
      yield put(push(`/title/${makeDashesUrl(title)}`))
    }
    yield put(actionsUI.openSimilarSectionRequest(false))
  } catch (e) {
    yield put(push(`/error`))
    yield put(actionsUI.ErrorTopItemReq(e))
    console.log(e);
  }
}






function* watchGetMovieFavoriteRequest() {
  yield takeEvery(actions.Types.GET_MOVIE_FAV_REQUEST, getMovieFavorite)
}
/**
 * handles add movie to favorites
 * @generator
 * @param {number} id - item id
 * @param {string} poster poster url
 * @param {number} genreId - id of genre of item
 * @param {string} title - item title
 * @yields {function} Action - getMovieFavoriteSuccess - add to favorite 
 * @yields {function} Action - categorizeArrays - put item in category array
 */
function* getMovieFavorite({ id, poster, genreId, title }: INT.IFavMovie) {
  try {
    yield put(actions.getMovieFavoriteSuccess({ id, poster, genreId }))
    yield put(actions.categorizeArrays({ id, poster, genreId, title }))
  } catch (e) {
    console.log(e)
  }
}

function* watchGetSerieFavoriteRequest() {
  yield takeEvery(actions.Types.GET_SERIE_FAV_REQUEST, getSerieFavorite)
}
/**
 * handles add serie to favorites
 * @generator
 * @param {number} id - item id
 * @param {string} poster poster url
 * @param {number} genreId - id of genre of item
 * @param {string} title - item title
 * @yields {function} Action - getSerieFavoriteSuccess - add to favorite 
 * @yields {function} Action - categorizeArrays - put item in category array
 */
function* getSerieFavorite({ id, poster, genreId, title }: INT.IFavMovie) {
  try {
    yield put(actions.getSerieFavoriteSuccess({ id, poster, genreId }))
    yield put(actions.categorizeArrays({ id, poster, genreId, title }))
  } catch (e) {
    console.log(e)
  }
}




function* watchRemoveFavMovieRequest() {
  yield takeEvery(actions.Types.REMOVE_FAV_MOVIE_REQUEST, removeFromMovieFav)
}
/**
 * handles remove movie to favorites
 * @generator
 * @param {number} id - item id
 * @param {number} genreId - id of genre of item
 * @yields {function} Action - removeFavMovieSuccess - remove from favorite 
 * @yields {function} Action - removeFromFavCategories - remove item from category array
 */
function* removeFromMovieFav({ id, genreId }: any) {
  try {
    yield put(actions.removeFavMovieSuccess(id))
    yield put(actions.removeFromFavCategories(id, genreId))
  } catch (e) {
    console.log(e)
  }
}

function* watchRemoveFavSerieRequest() {
  yield takeEvery(actions.Types.REMOVE_FAV_SERIE_REQUEST, removeFromSerieFav)
}
/**
 * handles remove serie to favorites
 * @generator
 * @param {number} id - item id
 * @param {number} genreId - id of genre of item
 * @yields {function} Action - removeFavMovieSuccess - remove from favorite 
 * @yields {function} Action - removeFromFavCategories - remove item from category array
 */
function* removeFromSerieFav({ id, genreId }: any) {
  try {
    yield put(actions.removeFavSerieSuccess(id))
    yield put(actions.removeFromFavCategories(id, genreId))
  } catch (e) {
    console.log(e)
  }
}








const apiSagas = [
  fork(watchGetUsersMoviesRequest),
  fork(watchGetToggleMoviesRequest),
  fork(watchGetToggleSeiresRequest),
  fork(watchGetUsersSeriesRequest),
  fork(watchgetMovieGenresRequest),
  fork(watchgetSerieGenresRequest),
  fork(watchGetMoviesByGenreRequest),
  fork(watchGetSeriesByGenreRequest),
  fork(watchGetMovieInfoRequest),
  fork(watchGetSerieInfoRequest),
  fork(watchGetCastInfoRequest),
  fork(watchGetMovieInfoModalRequest),
  fork(watchGetSerieInfoModalRequest),
  fork(watchGetMovieFavoriteRequest),
  fork(watchGetSerieFavoriteRequest),
  fork(watchRemoveFavMovieRequest),
  fork(watchRemoveFavSerieRequest)
]
export default apiSagas