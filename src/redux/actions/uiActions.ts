import * as INT from '../../helpers/interfaces'


export const Types: any = {
  GET_MENU_TOGGLE_REQUEST: 'GET_MENU_TOGGLE_REQUEST',
  GET_MENU_TOGGLE_SUCCESS: 'GET_MENU_TOGGLE_SUCCESS',
  GET_TOGGLE_MOVIE_CAT_SUCCESS: 'GET_TOGGLE_MOVIE_CAT_SUCCESS',
  GET_TOGGLE_SERIE_CAT_SUCCESS: 'GET_TOGGLE_SERIE_CAT_SUCCESS'
}


export const getToggleMenuRequest = (isMenuOpen: boolean) => ({
  type: Types.GET_MENU_TOGGLE_REQUEST,
  payload: isMenuOpen
} as INT.IMenuSlideAction)

export const getToggleMenuSuccess = (isMenuOpen: boolean) => ({
  type: Types.GET_MENU_TOGGLE_SUCCESS,
  payload: isMenuOpen
} as INT.IMenuSlideAction)



export const getToggleMovieCatSuccess = ({ payload }: INT.IToggleCat) => ({
  type: Types.GET_TOGGLE_MOVIE_CAT_SUCCESS,
  payload
})

export const getToggleSerieCatSuccess = ({ payload }: INT.IToggleCat) => ({
  type: Types.GET_TOGGLE_SERIE_CAT_SUCCESS,
  payload
})