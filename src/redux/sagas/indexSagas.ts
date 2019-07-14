import { all } from 'redux-saga/effects'
import apiSagas from './apiSagas'
import uiSagas from './uiSagas'
// import awsSagas from './awsSagas'

// allow all forked processes to be created in parallel
export default function* rootSaga() {
  yield all([...apiSagas, ...uiSagas])
}

