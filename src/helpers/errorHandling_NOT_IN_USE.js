
export default function reduxHelper(actionName, fn) {
  if (typeof actionName !== 'string') {
    throw new Error('actionName must be a string')
  }
  if (typeof fn !== 'function') {
    throw new Error('fn must be a function')
  }

  const actionNameUpper = actionName.toUpperCase()
  const actionRequest = actionNameUpper + '_REQUEST'
  const actionSuccess = actionNameUpper + '_SUCCESS'
  const actionFailure = actionNameUpper + '_FAILURE'

  const initialState = {
    data: null,
    loading: false,
    error: null
  }

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionRequest:
        return {
          ...state,
          loading: true
        }

      case actionSuccess:
        return {
          ...state,
          loading: false,
          data: action.data !== undefined ? action.data : null
        }

      case actionFailure:
        return {
          ...state,
          loading: false,
          error: action.error
        }

      default:
        return state
    }
  }


  const action = function () {
    const args = arguments
    return dispatch => {
      dispatch({
        type: actionRequest
      })
      try {
        const result = fn.apply(null, args)
        // It's a promise
        if (typeof result.then === 'function') {
          result.then(data => dispatch({
            type: actionSuccess,
            data
          }))
            .catch(error => dispatch({
              type: actionFailure,
              error
            }))
        } else {
          dispatch({
            type: actionSuccess,
            data: result
          })
        }
      } catch (error) {
        dispatch({
          type: actionFailure,
          error
        })
      }
    }
  }

  return {
    action,
    actionTypes: {
      request: actionRequest,
      success: actionSuccess,
      failure: actionFailure
    },
    reducer
  }
}




export function middleware({ dispatch }) {
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch)
    }

    return next(action)
  }
}



// export const { loginAction, loginActionTypes, loginReducer } = reduxHelper('login', function(username, password) {
//   return api.login('username', 'password')
// })