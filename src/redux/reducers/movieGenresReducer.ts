import { Types } from '../actions/apiActions'
import { MOVIE_GENRE_STATE } from '../state/movieGenreState'
// import * as INT from '../../helpers/interfaces'


export default function movieGenresReducer(state = MOVIE_GENRE_STATE, action: any) {
  switch (action.type) {

    case Types.GET_MOVIE_BY_GENRE_SUCCESS: {
      switch (action.name) {
        case 'Action': {
          return {
            ...state,
            action: [...state.action, ...action.payload]
          }
        }
        case 'Adventure': {
          return {
            ...state,
            adventure: [...state.adventure, ...action.payload]
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
        case 'Fantasy': {
          return {
            ...state,
            fantasy: [...state.fantasy, ...action.payload]
          }
        }
        case 'History': {
          return {
            ...state,
            history: [...state.history, ...action.payload]
          }
        }
        case 'Horror': {
          return {
            ...state,
            horror: [...state.horror, ...action.payload]
          }
        }
        case 'Music': {
          return {
            ...state,
            music: [...state.music, ...action.payload]
          }
        }
        case 'Mystery': {
          return {
            ...state,
            mystery: [...state.mystery, ...action.payload]
          }
        }
        case 'Romance': {
          return {
            ...state,
            romance: [...state.romance, ...action.payload]
          }
        }
        case 'Science Fiction': {
          return {
            ...state,
            science_fiction: [...state.science_fiction, ...action.payload]
          }
        }
        case 'TV Movie': {
          return {
            ...state,
            tv_movie: [...state.tv_movie, ...action.payload]
          }
        }
        case 'Thriller': {
          return {
            ...state,
            thriller: [...state.thriller, ...action.payload]
          }
        }
        case 'War': {
          return {
            ...state,
            war: [...state.war, ...action.payload]
          }
        }
        case 'Western': {
          return {
            ...state,
            western: [...state.western, ...action.payload]
          }
        }
      }
    }

    default: {
      return state
    }
  }
}
