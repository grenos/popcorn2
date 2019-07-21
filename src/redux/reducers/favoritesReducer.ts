import { Types } from '../actions/apiActions'
import { FAVORITES_STATE } from '../state/favoritesState'
// import * as INT from '../../helpers/interfaces'

export function favoritesReducer(state = FAVORITES_STATE, action: any) {
  switch (action.type) {

    case Types.CATEGORIZE_FAV_ARRAYS: {
      switch (action.genreId) {
        case 28: {
          return {
            ...state,
            action_items: [
              ...state.action_items,
              {
                id: action.id,
                poster: action.poster,
                genreId: action.genreId,
                title: action.title
              }]
          }
        }
        case 12: {
          console.log(action.title);
          return {
            ...state,
            adventure: [
              ...state.adventure,
              {
                id: action.id,
                poster: action.poster,
                genreId: action.genreId,
                title: action.title
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
                genreId: action.genreId,
                title: action.title
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
                genreId: action.genreId,
                title: action.title
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
                genreId: action.genreId,
                title: action.title
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
                genreId: action.genreId,
                title: action.title
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
                genreId: action.genreId,
                title: action.title
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
                genreId: action.genreId,
                title: action.title
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
                genreId: action.genreId,
                title: action.title
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
                genreId: action.genreId,
                title: action.title
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
                genreId: action.genreId,
                title: action.title
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
                genreId: action.genreId,
                title: action.title
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
                genreId: action.genreId,
                title: action.title
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
                genreId: action.genreId,
                title: action.title
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
                genreId: action.genreId,
                title: action.title
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
                genreId: action.genreId,
                title: action.title
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
                genreId: action.genreId,
                title: action.title
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
                genreId: action.genreId,
                title: action.title
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
                genreId: action.genreId,
                title: action.title
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
                genreId: action.genreId,
                title: action.title
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
                genreId: action.genreId,
                title: action.title
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
                genreId: action.genreId,
                title: action.title
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
                genreId: action.genreId,
                title: action.title
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
                genreId: action.genreId,
                title: action.title
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
                genreId: action.genreId,
                title: action.title
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
                genreId: action.genreId,
                title: action.title
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
                genreId: action.genreId,
                title: action.title
              }]
          }
        }
        default: {
          return state
        }
      } // inner switch end
    } //! case CATEGORIZE_FAV_ARRAYS end


    case Types.REMOVE_FAV_CATEGORIES_SUCCESS: {
      switch (action.genreId) {
        case 28: {
          return {
            ...state,
            action_items: state.action_items.filter((item: any) => action.id !== item.id)
          }
        }
        case 12: {
          return {
            ...state,
            adventure: state.adventure.filter((item: any) => action.id !== item.id)
          }
        }
        case 16: {
          return {
            ...state,
            animation: state.animation.filter((item: any) => action.id !== item.id)
          }
        }
        case 35: {
          return {
            ...state,
            comedy: state.comedy.filter((item: any) => action.id !== item.id)
          }
        }
        case 80: {
          return {
            ...state,
            crime: state.crime.filter((item: any) => action.id !== item.id)
          }
        }
        case 99: {
          return {
            ...state,
            documentary: state.documentary.filter((item: any) => action.id !== item.id)
          }
        }
        case 18: {
          return {
            ...state,
            drama: state.drama.filter((item: any) => action.id !== item.id)
          }
        }
        case 10751: {
          return {
            ...state,
            family: state.family.filter((item: any) => action.id !== item.id)
          }
        }
        case 14: {
          return {
            ...state,
            fantasy: state.fantasy.filter((item: any) => action.id !== item.id)
          }
        }
        case 36: {
          return {
            ...state,
            history: state.history.filter((item: any) => action.id !== item.id)
          }
        }
        case 27: {
          return {
            ...state,
            horror: state.horror.filter((item: any) => action.id !== item.id)
          }
        }
        case 10402: {
          return {
            ...state,
            music: state.music.filter((item: any) => action.id !== item.id)
          }
        }
        case 9648: {
          return {
            ...state,
            mystery: state.mystery.filter((item: any) => action.id !== item.id)
          }
        }
        case 10749: {
          return {
            ...state,
            romance: state.romance.filter((item: any) => action.id !== item.id)
          }
        }
        case 878: {
          return {
            ...state,
            science_fiction: state.science_fiction.filter((item: any) => action.id !== item.id)
          }
        }
        case 10770: {
          return {
            ...state,
            tv_movie: state.tv_movie.filter((item: any) => action.id !== item.id)
          }
        }
        case 53: {
          return {
            ...state,
            thriller: state.thriller.filter((item: any) => action.id !== item.id)
          }
        }
        case 10752: {
          return {
            ...state,
            war: state.war.filter((item: any) => action.id !== item.id)
          }
        }
        case 37: {
          return {
            ...state,
            western: state.western.filter((item: any) => action.id !== item.id)
          }
        }
        // series
        case 10759: {
          return {
            ...state,
            adventure: state.adventure.filter((item: any) => action.id !== item.id)
          }
        }
        case 10762: {
          return {
            ...state,
            animation: state.animation.filter((item: any) => action.id !== item.id)
          }
        }
        case 10763: {
          return {
            ...state,
            news: state.news.filter((item: any) => action.id !== item.id)
          }
        }
        case 10764: {
          return {
            ...state,
            reality: state.reality.filter((item: any) => action.id !== item.id)
          }
        }
        case 10765: {
          return {
            ...state,
            science_fiction: state.science_fiction.filter((item: any) => action.id !== item.id)
          }
        }
        case 10766: {
          return {
            ...state,
            soap: state.soap.filter((item: any) => action.id !== item.id)
          }
        }
        case 10767: {
          return {
            ...state,
            talk: state.talk.filter((item: any) => action.id !== item.id)
          }
        }
        case 10768: {
          return {
            ...state,
            war: state.war.filter((item: any) => action.id !== item.id)
          }
        }
        default: {
          return state
        }
      } // inner switch end
    } //! case REMOVE_FAV_CATEGORIES_SUCCESS end
    default:
      return state
  } // outer switch end
} // reducer end





