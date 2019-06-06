
import { takeLatest, call, fork, put, takeEvery } from 'redux-saga/effects'
import * as actions from '../actions/apiActions'
import * as actionsUI from '../actions/uiActions'
import * as api from '../api/apiCalls'
import * as INT from '../../helpers/interfaces'




function* watchGetUsersMoviesRequest() {
  yield takeLatest(actions.Types.GET_USER_INPUT_MOVIES_REQUEST, getUserInputMovies)
}
function* getUserInputMovies({ payload: value }: INT.IInputSagaProps) {
  try {
    const result = yield call(api.getUserInputMovies, value)
    yield put(actions.getUserInputMoviesSuccess({
      result: result.data.results
    } as INT.ISearchMovies))
  } catch (e) {
    console.log(e);
  }
}

function* watchGetUsersSeriesRequest() {
  yield takeLatest(actions.Types.GET_USER_INPUT_SERIES_REQUEST, getUserInputSeries)
}
function* getUserInputSeries({ payload: value }: INT.IInputSagaProps) {
  try {
    const result = yield call(api.getUserInputSeries, value)

    yield put(actions.getUserInputSeriesSuccess({
      result: result.data.results
    } as INT.ISearchSeries))
  } catch (e) {
    console.log(e);
  }
}




function* watchGetToggleMoviesRequest() {
  yield takeEvery(actions.Types.GET_TOGGLE_MOVIES_REQUEST, getToggleMovies)
}
function* getToggleMovies({ payload: page }: INT.IToggleSagaProps) {
  try {
    const result = yield call(api.getToggleMovies, page)
    yield put(actions.getToggleMoviesSuccess({
      result: result.data.results
    } as INT.ISearchMovies))

    yield put(actionsUI.getToggleMovieCatSuccess({
      payload: true
    } as INT.IToggleCat))

    yield put(actionsUI.getToggleSerieCatSuccess({
      payload: false
    } as INT.IToggleCat))
  } catch (e) {
    console.log(e);
  }
}

function* watchGetToggleSeiresRequest() {
  yield takeEvery(actions.Types.GET_TOGGLE_SERIES_REQUEST, getToggleSeries)
}
function* getToggleSeries({ payload: page }: INT.IToggleSagaProps) {
  try {
    const result = yield call(api.getToggleSeries, page)
    yield put(actions.getToggleSeriesSuccess({
      result: result.data.results
    } as INT.ISearchSeries))

    yield put(actionsUI.getToggleSerieCatSuccess({
      payload: true
    } as INT.IToggleCat))

    yield put(actionsUI.getToggleMovieCatSuccess({
      payload: false
    } as INT.IToggleCat))
  } catch (e) {
    console.log(e);
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
    console.log(result);
  } catch (e) {
    console.log(e)
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
    console.log(e)
  }
}



function* watchGetMoviesByGenreRequest() {
  yield takeEvery(actions.Types.GET_MOVIE_BY_GENRE_REQUEST, getMoviesByGenre)
}
function* getMoviesByGenre({ id, page }: INT.IGetByGenreSagaProps) {
  try {
    const result = yield call(api.getMoviesByGenre, id, page)
    yield put(actions.getMoviesByGenreSuccess({
      result: result.data.results
    } as INT.ISearchMovies))
  } catch (e) {
    console.log(e)
  }
}




function* watchGetSeriesByGenreRequest() {
  yield takeLatest(actions.Types.GET_SERIE_BY_GENRE_REQUEST, getSeriesByGenre)
}
function* getSeriesByGenre({ id, page }: INT.IGetByGenreSagaProps) {
  try {
    const result = yield call(api.getSeriesByGenre, id, page)
    yield put(actions.getSeriesByGenreSuccess({
      result: result.data.results
    } as INT.ISearchSeries))
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
  fork(watchGetSeriesByGenreRequest)
]
export default apiSagas