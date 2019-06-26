import * as INT from '../../helpers/interfaces'


export const Types: any = {
  GET_MENU_TOGGLE_REQUEST: 'GET_MENU_TOGGLE_REQUEST',
  GET_MENU_TOGGLE_SUCCESS: 'GET_MENU_TOGGLE_SUCCESS',
  GET_TOGGLE_MOVIE_CAT_SUCCESS: 'GET_TOGGLE_MOVIE_CAT_SUCCESS',
  GET_TOGGLE_MOVIE_CAT_REQUEST: 'GET_TOGGLE_MOVIE_CAT_REQUEST',
  GET_TOGGLE_SERIE_CAT_SUCCESS: 'GET_TOGGLE_SERIE_CAT_SUCCESS',
  GET_TOGGLE_SERIE_CAT_REQUEST: 'GET_TOGGLE_SERIE_CAT_REQUEST',
  USER_HAS_TYPED_REQUEST: 'USER_HAS_TYPED_REQUEST',
  USER_HAS_TYPED_SUCCESS: 'USER_HAS_TYPED_SUCCESS',
  TOP_ITEMS_ACTIVE_ACTION: 'TOP_ITEMS_ACTIVE_ACTION',
  SEARCH_ITEMS_ACTIVE_ACTION: 'SEARCH_ITEMS_ACTIVE_ACTION',
  GENRE_ITEMS_ACTIVE_ACTION: 'GENRE_ITEMS_ACTIVE_ACTION',
  IS_MOVIE_MODAL_OPEN_ACTION: 'IS_MOVIE_MODAL_OPEN_ACTION',
  IS_VIDEO_SECTION_OPEN: 'IS_VIDEO_SECTION_OPEN',
  IS_SIMILAR_SECTION_OPEN: 'IS_SIMILAR_SECTION_OPEN',
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


export const userHasTypedRequest = (input: string) => ({
  type: Types.USER_HAS_TYPED_REQUEST,
  input,
})
export const userHasTypedSuccess = ({ payload }: any) => ({
  type: Types.USER_HAS_TYPED_SUCCESS,
  payload
})


export const TopItemsActive = (toggle: boolean) => ({
  type: Types.TOP_ITEMS_ACTIVE_ACTION,
  toggle
})
export const SearchItemsActive = (toggle: boolean) => ({
  type: Types.SEARCH_ITEMS_ACTIVE_ACTION,
  toggle
})
export const genreItemsActive = (toggle: boolean) => ({
  type: Types.GENRE_ITEMS_ACTIVE_ACTION,
  toggle
})
export const openMovieModalRequest = (toggle: boolean) => ({
  type: Types.IS_MOVIE_MODAL_OPEN_ACTION,
  toggle
})
export const openVideoSectionRequest = (toggle: boolean) => ({
  type: Types.IS_VIDEO_SECTION_OPEN,
  toggle
})
export const openSimilarSectionRequest = (toggle: boolean) => ({
  type: Types.IS_SIMILAR_SECTION_OPEN,
  toggle
})