import { Types } from '../actions/apiActions'
import { SERIES_GENRES_STATE } from '../state/seriesGenreState'
// import * as INT from '../../helpers/interfaces'




export default function seriesReducer(state = SERIES_GENRES_STATE, action: any) {
  switch (action.type) {

    case Types.GET_SERIE_BY_GENRE_SUCCESS:
      switch (action.name) {
        case 'Action & Adventure': {
          return {
            ...state,
            action_adventure: [...state.action_adventure, ...action.payload]
          }
        }
        case 'Animation': {
          return {
            ...state,
            animation: [...state.animation, ...action.payload]
          }
        }
        case 'Comedy': {
          return {
            ...state,
            comedy: [...state.comedy, ...action.payload]
          }
        }
        case 'Crime': {
          return {
            ...state,
            crime: [...state.crime, ...action.payload]
          }
        }
        case 'Documentary': {
          return {
            ...state,
            documentary: [...state.documentary, ...action.payload]
          }
        }
        case 'Drama': {
          return {
            ...state,
            drama: [...state.drama, ...action.payload]
          }
        }
        case 'Family': {
          return {
            ...state,
            family: [...state.family, ...action.payload]
          }
        }
        case 'Kids': {
          return {
            ...state,
            kids: [...state.kids, ...action.payload]
          }
        }
        case 'Mystery': {
          return {
            ...state,
            mystery: [...state.mystery, ...action.payload]
          }
        }
        case 'News': {
          return {
            ...state,
            news: [...state.news, ...action.payload]
          }
        }
        case 'Reality': {
          return {
            ...state,
            reality: [...state.reality, ...action.payload]
          }
        }
        case 'Sci-Fi & Fantasy': {
          return {
            ...state,
            scifi_fantasy: [...state.scifi_fantasy, ...action.payload]
          }
        }
        case 'Soap': {
          return {
            ...state,
            soap: [...state.soap, ...action.payload]
          }
        }
        case 'Talk': {
          return {
            ...state,
            talk: [...state.talk, ...action.payload]
          }
        }
        case 'War & Politics': {
          return {
            ...state,
            war_politics: [...state.war_politics, ...action.payload]
          }
        }
        case 'Western': {
          return {
            ...state,
            western: [...state.western, ...action.payload]
          }
        }
      }
      break

    default: {
      return state
    }
  }
}
