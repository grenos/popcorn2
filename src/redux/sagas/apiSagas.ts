
import { takeEvery, takeLatest, call, fork, put, take } from 'redux-saga/effects'
import * as actions from '../actions/apiActions'
import * as api from '../api/apiCalls'


interface InputProps {
  payload: string
}

// worker saga
// call allows us to call a promise and call it sequentially 
// i.e. we will wait it to resolve
function* getUserInput({ payload: value }: InputProps) {
  // we use try/catch to avoid error bubbling to the root saga
  // and we handle it inside its saga
  try {
    // when the call to api user is resolved with axios
    // this call method will assign the data to const result
    const result = yield call(api.getUserInput, value)

    // any code from here on will be ran after the call() method
    // has been resolved and assigned to const results
    console.log(result);

    // uppon getting the results we call the action that sends 
    // the data to our reducer/state
    // yield put(actions.getUserInputRequest({
    //   items: result.data.data
    // }))
  } catch (e) {

  }
}
// takeEvery helper is also called a non-blocking saga
// it will keep sending requests to its worker saga every time it is called
// watcher saga watches how many times a saga is dispatched
//! takeEvery under the hood is allways running a while(true) loop (see App.js)
function* watchGetUsersRequest() {
  yield takeEvery(actions.Types.GET_USER_INPUT_REQUEST, getUserInput)
}




const apiSagas = [
  fork(watchGetUsersRequest),
]

export default apiSagas