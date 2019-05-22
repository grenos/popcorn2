import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../redux/reducers/indexReducers'
import { middleware } from '../redux/store/store'


/**
 * Create a testing Store with imported reducers, middleware and fake initial state.
 * globals: rootReducer, middlewares
 * @param {object} initialState - initial state for store.
 * @function storeFactory
 * @returns {Store} - Redux store
 */
export const storeFactory = (initialState: any) => {
  const createStoreWithMiddlware = applyMiddleware(...middleware)(createStore)
  return createStoreWithMiddlware(rootReducer, initialState)
}



/**
 * Return ShallowWrapper containing node(s) with the given data-test value
 * @param {shallowWrapper} wrapper - Enzyme shallowWrapper to search within
 * @param {string} val - Value of data-test attribue for search.
 * @returns {shallowWrapper}
 */
export const findByTestAttr = (wrapper: any, val: any) => {
  return wrapper.find(`[data-test="${val}"]`)
}





