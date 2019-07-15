import { createBrowserHistory } from 'history'
import indexReducers from '../reducers/indexReducers'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/indexSagas'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import hardSet from 'redux-persist/lib/stateReconciler/hardSet';


const sagaMiddleware = createSagaMiddleware()

export const history = createBrowserHistory()

export const middleware = [sagaMiddleware, routerMiddleware(history)]

const authPersistConfig = {
  key: 'awsReducer',
  storage: storage,
  blacklist: [
    'router',
    'moviesReducer',
    'seriesReducer',
    'movieGenresReducer',
    'serieGenresReducer',
    'uiReducer'
  ]
}

const pReducer = persistReducer(authPersistConfig, indexReducers(history))

export const store: any = createStore(
  // indexReducers(history),
  pReducer,
  compose(
    applyMiddleware(...middleware),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      : (f: any) => f
  )
)

// pass redux store to persistor to be saved to local storage
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga)
