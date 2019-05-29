
import { takeEvery, put, fork } from 'redux-saga/effects'
import * as actions from '../actions/uiActions'
import * as INT from '../../helpers/interfaces'




function* watchGetToggleMenuRequest() {
  yield takeEvery(actions.Types.GET_MENU_TOGGLE_REQUEST, getToggleMEnu)
}
function* getToggleMEnu({ payload: isMenuOpen }: INT.IMenuSlideAction) {
  try {
    yield put(actions.getToggleMenuSuccess(isMenuOpen) as INT.IMenuSlideAction)
  } catch (e) {
    console.log(e);
  }
}


const uiSagas = [
  fork(watchGetToggleMenuRequest),
]
export default uiSagas