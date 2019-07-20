import { Types } from '../actions/apiActions'
import { FAVORITES_STATE } from '../state/favoritesState'
// import * as INT from '../../helpers/interfaces'
import { filterFavCategories } from '../../helpers/helperFunctions'

function createReducer(initialState: any, handlers: any) {
  return function reducer(state = initialState, action: any) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}


export const favoritesReducer = createReducer(FAVORITES_STATE, {
  [Types.CATEGORIZE_FAV_ARRAYS]: (state = FAVORITES_STATE, action: any) => {
    // const arrays = action.arr1.concat(action.arr2)
    // arrays.forEach((item: any) => {

    switch (action.genreId) {

      case 28: {
        return {
          ...state,
          action_items: [
            ...state.action_items,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }

      case 12: {
        return {
          ...state,
          adventure: [
            ...state.adventure,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }

      case 16: {
        return {
          ...state,
          animation: [
            ...state.animation,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }

      case 35: {
        return {
          ...state,
          comedy: [
            ...state.comedy,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }

      case 80: {
        return {
          ...state,
          crime: [
            ...state.crime,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }

      case 99: {
        return {
          ...state,
          documentary: [
            ...state.documentary,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }

      case 18: {
        return {
          ...state,
          drama: [
            ...state.drama,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }

      case 10751: {
        return {
          ...state,
          family: [
            ...state.family,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }

      case 14: {
        return {
          ...state,
          fantasy: [
            ...state.fantasy,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }

      case 36: {
        return {
          ...state,
          history: [
            ...state.history,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }

      case 27: {
        return {
          ...state,
          horror: [
            ...state.horror,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }

      case 10402: {
        return {
          ...state,
          music: [
            ...state.music,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }

      case 9648: {
        return {
          ...state,
          mystery: [
            ...state.mystery,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }

      case 10749: {
        return {
          ...state,
          romance: [
            ...state.romance,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }

      case 878: {
        return {
          ...state,
          science_fiction: [
            ...state.science_fiction,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }

      case 10770: {
        return {
          ...state,
          tv_movie: [
            ...state.tv_movie,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }

      case 53: {
        return {
          ...state,
          thriller: [
            ...state.thriller,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }

      case 10752: {
        return {
          ...state,
          war: [
            ...state.war,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }

      case 37: {
        return {
          ...state,
          western: [
            ...state.western,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }
      // series
      case 10759: {
        return {
          ...state,
          adventure: [
            ...state.adventure,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }

      case 10762: {
        return {
          ...state,
          animation: [
            ...state.animation,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }

      case 10763: {
        return {
          ...state,
          news: [
            ...state.news,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }

      case 10764: {
        return {
          ...state,
          reality: [
            ...state.reality,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }

      case 10765: {
        return {
          ...state,
          science_fiction: [
            ...state.science_fiction,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }

      case 10766: {
        return {
          ...state,
          soap: [
            ...state.soap,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }

      case 10767: {
        return {
          ...state,
          talk: [
            ...state.talk,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }

      case 10768: {
        return {
          ...state,
          war: [
            ...state.war,
            {
              id: action.id,
              poster: action.poster,
              genreId: action.genreId
            }]
        }
      }

      default: {
        return state
      }
    } // inner switch end
  }
})



