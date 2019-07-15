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
        topSeries: [...state.topSeries, ...action.payload]
      }
    }
    case Types.GET_SERIE_INFO_SUCCESS: {
      return {
        ...state,
        serieInfo: { ...action.payload }
      }
    }
    case Types.GET_SERIE_GENRES_SUCCESS: {
      return {
        ...state,
        serieGenres: action.payload
      }
    }
    case Types.CLEAR_SERIES_BY_GENRES_STATE: {
      return {
        ...state,
        seriesByGenre: []
      }
    }
    case Types.GET_SERIE_INFO_MODAL_SUCCESS: {
      return {
        ...state,
        serieInfoModal: { ...action.payload }
      }
    }
    case Types.GET_SERIE_FAV_SUCCESS: {
      return {
        ...state,
        favSeries: [
          ...state.favSeries,
          {
            id: action.id,
            poster: action.poster,
            genreId: action.genreId
          }
        ]
      }
    }
    case Types.REMOVE_FAV_SERIE_SUCCESS: {
      return {
        ...state,
        favSeries: state.favSeries.filter(item => action.id !== item.id)
      }
    }
    default: {
      return state
    }
  }
}
