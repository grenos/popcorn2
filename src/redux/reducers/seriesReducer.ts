import { Types } from '../actions/apiActions'
import { SERIES_STATE } from '../state/seriesState'
// import * as INT from '../../helpers/interfaces'




export default function seriesReducer(state = SERIES_STATE, action: any) {
  switch (action.type) {
    case Types.GET_USER_INPUT_SERIES_SUCCESS: {
      return {
        ...state,
        searchSeries: action.payload
      }
    }
    case Types.GET_TOGGLE_SERIES_SUCCESS: {
      return {
        ...state,
        topSeries: action.payload
      }
    }
    case Types.GET_SERIE_GENRES_SUCCESS: {
      return {
        ...state,
        serieGenres: action.payload
      }
    }
    default: {
      return state
    }
  }
}
