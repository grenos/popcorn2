
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