
import { takeLatest, call, fork, put } from 'redux-saga/effects'
import * as actions from '../actions/apiActions'
import * as api from '../api/apiCalls'
import * as INT from '../../helpers/interfaces'




function* watchGetUsersRequest() {
  yield takeLatest(actions.Types.GET_USER_INPUT_REQUEST, getUserInput)
}

function* getUserInput({ payload: value }: INT.IInputSagaProps) {
  try {
    const result = yield call(api.getUserInput, value)

    yield put(actions.getUserInputSuccess({
      result: result.data.results
    }))
  } catch (e) {

  }
}




const apiSagas = [
  fork(watchGetUsersRequest),
]
export default apiSagas