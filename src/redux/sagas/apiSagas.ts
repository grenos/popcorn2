
import { takeLatest, call, fork, put } from 'redux-saga/effects'
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
    }))
  } catch (e) {

  }
}




const apiSagas = [
  fork(watchGetUsersMoviesRequest),
]
export default apiSagas