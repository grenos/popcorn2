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
            action_adventure: [...state.action_adventure, ...action.payload],
            serieCategoryId: action.id
          }
        }
        case 'Animation': {
          return {
            ...state,
            animation: [...state.animation, ...action.payload],
            serieCategoryId: action.id
          }
        }
        case 'Comedy': {
          return {
            ...state,
            comedy: [...state.comedy, ...action.payload],
            serieCategoryId: action.id
          }
        }
        case 'Crime': {
          return {
            ...state,
            crime: [...state.crime, ...action.payload],
            serieCategoryId: action.id
          }
        }
        case 'Documentary': {
          return {
            ...state,
            documentary: [...state.documentary, ...action.payload],
            serieCategoryId: action.id
          }
        }
        case 'Drama': {
          return {
            ...state,
            drama: [...state.drama, ...action.payload],
            serieCategoryId: action.id
          }
        }
        case 'Family': {
          return {
            ...state,
            family: [...state.family, ...action.payload],
            serieCategoryId: action.id
          }
        }
        case 'Kids': {
          return {
            ...state,
            kids: [...state.kids, ...action.payload],
            serieCategoryId: action.id
          }
        }
        case 'Mystery': {
          return {
            ...state,
            mystery: [...state.mystery, ...action.payload],
            serieCategoryId: action.id
          }
        }
        case 'News': {
          return {
            ...state,
            news: [...state.news, ...action.payload],
            serieCategoryId: action.id
          }
        }
        case 'Reality': {
          return {
            ...state,
            reality: [...state.reality, ...action.payload],
            serieCategoryId: action.id
          }
        }
        case 'Sci-Fi & Fantasy': {
          return {
            ...state,
            scifi_fantasy: [...state.scifi_fantasy, ...action.payload],
            serieCategoryId: action.id
          }
        }
        case 'Soap': {
          return {
            ...state,
            soap: [...state.soap, ...action.payload],
            serieCategoryId: action.id
          }
        }
        case 'Talk': {
          return {
            ...state,
            talk: [...state.talk, ...action.payload],
            serieCategoryId: action.id
          }
        }
        case 'War & Politics': {
          return {
            ...state,
            war_politics: [...state.war_politics, ...action.payload],
            serieCategoryId: action.id
          }
        }
        case 'Western': {
          return {
            ...state,
            western: [...state.western, ...action.payload],
            serieCategoryId: action.id
          }
        }
        default: {
          return state
        }
      }

    default: {
      return state
    }
  }
}
