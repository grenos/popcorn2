import { Types } from '../actions/uiActions'
import { UI_STATE } from '../state/uiState'
// import * as INT from '../../helpers/interfaces'



export default function uiReducer(state = UI_STATE, action: any) {
  switch (action.type) {
    case Types.GET_MENU_TOGGLE_SUCCESS: {
      return {
        ...state,
        isMenuOpenProp: action.payload
      }
    }
    case Types.GET_TOGGLE_MOVIE_CAT_SUCCESS: {
      return {
        ...state,
        isMovieCatSelected: action.payload
      }
    }
    case Types.GET_TOGGLE_SERIE_CAT_SUCCESS: {
      return {
        ...state,
        isSerieCatSelected: action.payload
      }
    }
    case Types.USER_HAS_TYPED_SUCCESS: {
      return {
        ...state,
        userHasTyped: action.payload
      }
    }
    default: {
      return state
    }
  }
}
