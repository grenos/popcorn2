import { Types } from '../actions/apiActions'
import { FAVORITES_STATE } from '../state/favoritesState'
// import * as INT from '../../helpers/interfaces'


function createReducer(initialState: any, handlers: any) {
  return function reducer(state = initialState, action: any) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}


export const favoritesReducer = createReducer([], {
  [Types.CATEGORIZE_FAV_ARRAYS]: (state = FAVORITES_STATE, action: any) => {
    const arrays = action.arr1.concat(action.arr2)
    arrays.map((item: any) => {
      switch (item.genreId) {
        case 28: {
          return (
            state.action.push(item)
          )
        }
        case 12: {
          return (
            state.adventure.push(item)
          )
        }
        case 16: {
          return (
            state.animation.push(item)
          )
        }
        case 35: {
          return (
            state.comedy.push(item)
          )
        }
        case 80: {
          return (
            state.crime.push(item)
          )
        }
        case 99: {
          return (
            state.documentary.push(item)
          )
        }
        case 18: {
          return (
            state.drama.push(item)
          )
        }
        case 10751: {
          return (
            state.family.push(item)
          )
        }
        case 14: {
          return (
            state.fantasy.push(item)
          )
        }
        case 36: {
          return (
            state.history.push(item)
          )
        }
        case 27: {
          return (
            state.horror.push(item)
          )
        }
        case 10402: {
          return (
            state.music.push(item)
          )
        }
        case 9648: {
          return (
            state.mystery.push(item)
          )
        }
        case 10749: {
          return (
            state.romance.push(item)
          )
        }
        case 878: {
          return (
            state.science_fiction.push(item)
          )
        }
        case 10770: {
          return (
            state.tv_movie.push(item)
          )
        }
        case 53: {
          return (
            state.thriller.push(item)
          )
        }
        case 10752: {
          return (
            state.war.push(item)
          )
        }
        case 37: {
          return (
            state.western.push(item)
          )
        }
        // series
        case 10759: {
          return (
            state.adventure.push(item)
          )
        }
        case 10762: {
          return (
            state.animation.push(item)
          )
        }
        case 10763: {
          return (
            state.news.push(item)
          )
        }
        case 10764: {
          return (
            state.reality.push(item)
          )
        }
        case 10765: {
          return (
            state.science_fiction.push(item)
          )
        }
        case 10766: {
          return (
            state.soap.push(item)
          )
        }
        case 10767: {
          return (
            state.talk.push(item)
          )
        }
        case 10768: {
          return (
            state.war.push(item)
          )
        }
        default: {
          return state
        }
      } // inner switch end
    }) // map end
    return state
  }
})



