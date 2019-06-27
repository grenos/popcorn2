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
    case Types.TOP_ITEMS_ACTIVE_ACTION: {
      return {
        ...state,
        TopItemsActive: action.toggle
      }
    }
    case Types.SEARCH_ITEMS_ACTIVE_ACTION: {
      return {
        ...state,
        SearchItemsActive: action.toggle
      }
    }
    case Types.GENRE_ITEMS_ACTIVE_ACTION: {
      return {
        ...state,
        genreItemsActive: action.toggle
      }
    }
    case Types.IS_MOVIE_MODAL_OPEN_ACTION: {
      return {
        ...state,
        isMovieModalOpen: action.toggle
      }
    }
    case Types.IS_VIDEO_SECTION_OPEN: {
      return {
        ...state,
        isVideoSectionOpen: action.toggle
      }
    }
    case Types.IS_SIMILAR_SECTION_OPEN: {
      return {
        ...state,
        isSimilarSectionOpen: action.toggle
      }
    }
    case Types.IS_MORE_INFO_OPEN: {
      return {
        ...state,
        isMoreInfoOpen: action.toggle
      }
    }
    default: {
      return state
    }
  }
}
