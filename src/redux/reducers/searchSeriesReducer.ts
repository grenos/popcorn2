import { Types } from '../actions/apiActions'
import { SEARCH_SERIES_STATE } from '../state/searchSeriesState'
// import * as INT from '../../helpers/interfaces'




export default function seriesReducer(state = SEARCH_SERIES_STATE, action: any) {
  switch (action.type) {
    case Types.GET_USER_INPUT_SERIES_SUCCESS: {
      return {
        ...state,
        searchSeries: action.payload
      }
    }
    default: {
      return state
    }
  }
}
