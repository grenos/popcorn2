import { Types } from '../actions/apiActions'
import { BODY_VISORE_STATE } from '../state/bodyVisoreState'
// import * as INT from '../../helpers/interfaces'

export default function favoritesReducer(state = BODY_VISORE_STATE, action: any) {
  switch (action.type) {

    case Types.GET_BODY_VISORE_MOVIE_INFO_SUCCESS:
      return {
        ...state,
        movie_body_visore_info: [...state.movie_body_visore_info, action.result],
      }

    case Types.GET_BODY_VISORE_SERIE_INFO_SUCCESS:
      return {
        ...state,
        serie_body_visore_info: [...state.serie_body_visore_info, action.result],
      }

    default: {
      return state
    }

  }
}