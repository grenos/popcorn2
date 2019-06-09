import * as INT from '../../helpers/interfaces'


export const Types: any = {
  GET_MENU_TOGGLE_REQUEST: 'GET_MENU_TOGGLE_REQUEST',
  GET_MENU_TOGGLE_SUCCESS: 'GET_MENU_TOGGLE_SUCCESS',
  GET_TOGGLE_MOVIE_CAT_SUCCESS: 'GET_TOGGLE_MOVIE_CAT_SUCCESS',
  GET_TOGGLE_MOVIE_CAT_REQUEST: 'GET_TOGGLE_MOVIE_CAT_REQUEST',
  GET_TOGGLE_SERIE_CAT_SUCCESS: 'GET_TOGGLE_SERIE_CAT_SUCCESS',
  GET_TOGGLE_SERIE_CAT_REQUEST: 'GET_TOGGLE_SERIE_CAT_REQUEST'
}


export const getToggleMenuRequest = (isMenuOpenProp: boolean) => ({
  type: Types.GET_MENU_TOGGLE_REQUEST,
  payload: isMenuOpenProp
} as INT.IMenuSlideAction)

export const getToggleMenuSuccess = (isMenuOpenProp: boolean) => ({
  type: Types.GET_MENU_TOGGLE_SUCCESS,
  payload: isMenuOpenProp
} as INT.IMenuSlideAction)


export const getToggleMovieCatRequest = (payload: boolean): INT.IToggleCat => ({
  type: Types.GET_TOGGLE_MOVIE_CAT_REQUEST,
  payload
})
export const getToggleMovieCatSuccess = ({ payload }: INT.IToggleCat) => ({
  type: Types.GET_TOGGLE_MOVIE_CAT_SUCCESS,
  payload
})


export const getToggleSerieCatRequest = (payload: boolean): INT.IToggleCat => ({
  type: Types.GET_TOGGLE_SERIE_CAT_REQUEST,
  payload
})
export const getToggleSerieCatSuccess = ({ payload }: INT.IToggleCat) => ({
  type: Types.GET_TOGGLE_SERIE_CAT_SUCCESS,
  payload
})