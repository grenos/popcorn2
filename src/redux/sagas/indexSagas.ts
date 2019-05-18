import { all } from 'redux-saga/effects'
import apiSagas from './apiSagas';

// allow all forked processes to be created in parallel
export default function* rootSaga() {
  yield all([...apiSagas])
}

