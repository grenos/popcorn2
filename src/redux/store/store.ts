import indexReducers from '../reducers/indexReducers'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/indexSagas'

const sagaMiddleware = createSagaMiddleware()

export const middleware = [sagaMiddleware]

export const store: any = createStore(
  indexReducers,
  compose(
    applyMiddleware(...middleware),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      : (f: any) => f
  )
)

sagaMiddleware.run(rootSaga)
