
import { takeLatest, call, fork, put, takeEvery } from 'redux-saga/effects'
import * as actions from '../actions/apiActions'
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


function* watchGetToggleMoviesRequest() {
  yield takeEvery(actions.Types.GET_TOGGLE_MOVIES_REQUEST, getToggleMovies)
}
function* getToggleMovies({ payload: page }: INT.IToggleSagaProps) {
  try {
    const result = yield call(api.getToggleMovies, page)
    yield put(actions.getToggleMoviesSuccess({
      result: result.data.results
    } as INT.ISearchMovies))
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
  } catch (e) {
    console.log(e);
  }
}



const apiSagas = [
  fork(watchGetUsersMoviesRequest),
  fork(watchGetToggleMoviesRequest),
  fork(watchGetToggleSeiresRequest),
]
export default apiSagas