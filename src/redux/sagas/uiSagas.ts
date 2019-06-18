
import { takeEvery, put, fork, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions/uiActions'
import * as INT from '../../helpers/interfaces'




function* watchGetToggleMenuRequest() {
  yield takeEvery(actions.Types.GET_MENU_TOGGLE_REQUEST, getToggleMEnu)
}
function* getToggleMEnu({ payload: isMenuOpenProp }: INT.IMenuSlideAction) {
  try {
    yield put(actions.getToggleMenuSuccess(isMenuOpenProp) as INT.IMenuSlideAction)
  } catch (e) {
    console.log(e);
  }
}



function* watchToggleMovieCatRequest() {
  yield takeEvery(actions.Types.GET_TOGGLE_MOVIE_CAT_REQUEST, getToggleMovieCat)
}
function* getToggleMovieCat({ payload }: INT.IMenuSlideAction) {
  try {
    yield put(actions.getToggleMovieCatSuccess({ payload }) as INT.IMenuSlideAction)
  } catch (e) {
    console.log(e);
  }
}

function* watchToggleSerieCatRequest() {
  yield takeEvery(actions.Types.GET_TOGGLE_SERIE_CAT_REQUEST, getToggleSerieCat)
}
function* getToggleSerieCat({ payload }: INT.IMenuSlideAction) {
  try {
    yield put(actions.getToggleSerieCatSuccess({ payload }) as INT.IMenuSlideAction)
  } catch (e) {
    console.log(e);
  }
}




function* getUserHasTypedRequest() {
  yield takeLatest(actions.Types.USER_HAS_TYPED_REQUEST, getUserInput)
}
function* getUserInput({ input }: any) {
  try {
    yield put(actions.userHasTypedSuccess({
      payload: input
    } as any))
  } catch (e) {
    console.log(e);
  }
}



const uiSagas = [
  fork(watchGetToggleMenuRequest),
  fork(watchToggleMovieCatRequest),
  fork(watchToggleSerieCatRequest),
  fork(getUserHasTypedRequest)
]
export default uiSagas