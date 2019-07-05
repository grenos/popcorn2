import { createBrowserHistory } from 'history'
import indexReducers from '../reducers/indexReducers'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/indexSagas'


const sagaMiddleware = createSagaMiddleware()

export const history = createBrowserHistory()

export const middleware = [sagaMiddleware, routerMiddleware(history)]

export const store: any = createStore(
  indexReducers(history),
  compose(
    applyMiddleware(...middleware),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      : (f: any) => f
  )
)

sagaMiddleware.run(rootSaga)
