
import { takeLatest, call, fork, put, select, takeEvery } from 'redux-saga/effects'
import * as actions from '../actions/awsActions'
import * as actionsUI from '../actions/uiActions'
import * as INT from '../../helpers/interfaces'
import { Auth } from 'aws-amplify';
import * as selectors from './selectors';


function* watchGetSignUpRequest() {
  yield takeEvery(actions.Types.GET_SIGNUP_REQUEST, getSignUp)
}
function* getSignUp() {

  try {
    const SignupState = yield select(selectors.getSignupState)
    // yield call(
    //   Auth.signUp({
    //     username: SignupState.email,
    //     password: SignupState.password,
    //     attributes: { SignupState.email, SignupState.name, }
    //   })
    // )

    // const result = yield call(api.getUserInputMovies, inputValue)
    // yield put(actions.getUserInputMoviesSuccess({
    //   result: result.data.results
    // } as INT.ISearchMovies))
  } catch (e) {
    console.log(e);
  }
}


const awsSagas = [
  fork(watchGetSignUpRequest)
]
export default awsSagas