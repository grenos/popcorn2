import { Types } from '../actions/apiActions'
import { FAVORITES_STATE } from '../state/favoritesState'
// import * as INT from '../../helpers/interfaces'


//! CANT FIND SOLUTION
// https://stackoverflow.com/questions/57095722/return-from-switch-statement-inside-array-map

export default function favoritesReducer(state = FAVORITES_STATE, action: any) {
  switch (action.type) {
    case Types.CATEGORIZE_FAV_ARRAYS:
      const arrays = action.arr1.concat(action.arr2)
      arrays.map((item: any) => {

        switch (item.genreId) {
          case 28: {
            return {
              ...state,
              action: [...state.action, item]
            }
          }
          case 12: {
            return {
              ...state,
              adventure: [...state.adventure, item]
            }
          }
          case 16: {
            return {
              ...state,
              animation: [...state.animation, item]
            }
          }
          case 35: {
            return {
              ...state,
              comedy: [...state.comedy, item]
            }
          }
          case 80: {
            return {
              ...state,
              crime: [...state.crime, item]
            }
          }
          case 99: {
            return {
              ...state,
              documentary: [...state.documentary, item]
            }
          }
          case 18: {
            return {
              ...state,
              drama: [...state.drama, item]
            }
          }
          case 10751: {
            return {
              ...state,
              family: [...state.family, item]
            }
          }
          case 14: {
            return {
              ...state,
              fantasy: [...state.fantasy, item]
            }
          }
          case 36: {
            return {
              ...state,
              history: [...state.history, item]
            }
          }
          case 27: {
            return {
              ...state,
              horror: [...state.horror, item]
            }
          }
          case 10402: {
            return {
              ...state,
              music: [...state.music, item]
            }
          }
          case 9648: {
            return {
              ...state,
              mystery: [...state.mystery, item]
            }
          }
          case 10749: {
            return {
              ...state,
              romance: [...state.romance, item]
            }
          }
          case 878: {
            return {
              ...state,
              science_fiction: [...state.science_fiction, item]
            }
          }
          case 10770: {
            return {
              ...state,
              tv_movie: [...state.tv_movie, item]
            }
          }
          case 53: {
            return {
              ...state,
              thriller: [...state.thriller, item]
            }
          }
          case 10752: {
            return {
              ...state,
              war: [...state.war, item]
            }
          }
          case 37: {
            return {
              ...state,
              western: [...state.western, item]
            }
          }
          // series
          case 10759: {
            return {
              ...state,
              adventure: [...state.adventure, item]
            }
          }
          case 10762: {
            return {
              ...state,
              animation: [...state.animation, item]
            }
          }
          case 10763: {
            return {
              ...state,
              news: [...state.news, item]
            }
          }
          case 10764: {
            return {
              ...state,
              reality: [...state.reality, item]
            }
          }
          case 10765: {
            return {
              ...state,
              science_fiction: [...state.science_fiction, item]
            }
          }
          case 10766: {
            return {
              ...state,
              soap: [...state.soap, item]
            }
          }
          case 10767: {
            return {
              ...state,
              talk: [...state.talk, item]
            }
          }
          case 10768: {
            return {
              ...state,
              war: [...state.war, item]
            }
          }
          default: {
            return state
          }
        } // inner switch end
      }) // map end
    default: {
      return state
    }
  } // outer switch end


} // action end

