import { Types } from '../actions/uiActions'
import { UI_STATE } from '../state/uiState'
import * as INT from '../../helpers/interfaces'




export default function uiReducer(state = UI_STATE, action: INT.IMenuSlideAction) {
  switch (action.type) {
    case Types.GET_MENU_TOGGLE_SUCCESS: {
      return {
        ...state,
        isMenuOpen: action.payload
      }
    }
    default: {
      return state
    }
  }
}
