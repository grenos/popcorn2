import { Types } from '../actions/apiActions'
import { MOVIE_GENRE_STATE } from '../state/movieGenreState'
// import * as INT from '../../helpers/interfaces'


export default function movieGenresReducer(state = MOVIE_GENRE_STATE, action: any) {
  switch (action.type) {
    case Types.GET_MOVIE_BY_GENRE_SUCCESS:
      switch (action.name) {
        case 'Action': {
          return {
            ...state,
            action: [...state.action, ...action.payload],
            movieCategoryId: action.id
          }
        }
        case 'Adventure': {
          return {
            ...state,
            adventure: [...state.adventure, ...action.payload],
            movieCategoryId: action.id
          }
        }
        case 'Animation': {
          return {
            ...state,
            animation: [...state.animation, ...action.payload],
            movieCategoryId: action.id
          }
        }
        case 'Comedy': {
          return {
            ...state,
            comedy: [...state.comedy, ...action.payload],
            movieCategoryId: action.id
          }
        }
        case 'Crime': {
          return {
            ...state,
            crime: [...state.crime, ...action.payload],
            movieCategoryId: action.id
          }
        }
        case 'Documentary': {
          return {
            ...state,
            documentary: [...state.documentary, ...action.payload],
            movieCategoryId: action.id
          }
        }
        case 'Drama': {
          return {
            ...state,
            drama: [...state.drama, ...action.payload],
            movieCategoryId: action.id
          }
        }
        case 'Family': {
          return {
            ...state,
            family: [...state.family, ...action.payload],
            movieCategoryId: action.id
          }
        }
        case 'Fantasy': {
          return {
            ...state,
            fantasy: [...state.fantasy, ...action.payload],
            movieCategoryId: action.id
          }
        }
        case 'History': {
          return {
            ...state,
            history: [...state.history, ...action.payload],
            movieCategoryId: action.id
          }
        }
        case 'Horror': {
          return {
            ...state,
            horror: [...state.horror, ...action.payload],
            movieCategoryId: action.id
          }
        }
        case 'Music': {
          return {
            ...state,
            music: [...state.music, ...action.payload],
            movieCategoryId: action.id
          }
        }
        case 'Mystery': {
          return {
            ...state,
            mystery: [...state.mystery, ...action.payload],
            movieCategoryId: action.id
          }
        }
        case 'Romance': {
          return {
            ...state,
            romance: [...state.romance, ...action.payload],
            movieCategoryId: action.id
          }
        }
        case 'Science_Fiction': {
          return {
            ...state,
            science_fiction: [...state.science_fiction, ...action.payload],
            movieCategoryId: action.id
          }
        }
        case 'TV Movie': {
          return {
            ...state,
            tv_movie: [...state.tv_movie, ...action.payload],
            movieCategoryId: action.id
          }
        }
        case 'Thriller': {
          return {
            ...state,
            thriller: [...state.thriller, ...action.payload],
            movieCategoryId: action.id
          }
        }
        case 'War': {
          return {
            ...state,
            war: [...state.war, ...action.payload],
            movieCategoryId: action.id
          }
        }
        case 'Western': {
          return {
            ...state,
            western: [...state.western, ...action.payload],
            movieCategoryId: action.id
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
