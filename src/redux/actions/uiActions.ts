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
  IS_MORE_INFO_OPEN: 'IS_MORE_INFO_OPEN',
  IS_AUTH_MODAL_OPEN: 'IS_AUTH_MODAL_OPEN',
  IS_CONFIRM_MODAL_OPEN: 'IS_CONFIRM_MODAL_OPEN',
  IS_RELATED_MOVIE_SELECTED: 'IS_RELATED_MOVIE_SELECTED',
  SET_AUTH_MODAL_UI: 'SET_AUTH_MODAL_UI',
  IS_FETCHING: 'IS_FETCHING'
}


export const getToggleMenuRequest = () => ({
  type: Types.GET_MENU_TOGGLE_REQUEST,
})

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
export const openMoreInfoRequest = (toggle: boolean) => ({
  type: Types.IS_MORE_INFO_OPEN,
  toggle
})

export const openAuthModal = (toggle: boolean) => ({
  type: Types.IS_AUTH_MODAL_OPEN,
  toggle
})

export const openConfirmModal = (toggle: boolean) => ({
  type: Types.IS_CONFIRM_MODAL_OPEN,
  toggle
})

export const relatedMovieSelected = (toggle: boolean) => ({
  type: Types.IS_RELATED_MOVIE_SELECTED,
  toggle
})

export const setAuthModalUI = (TypeUi: number) => ({
  type: Types.SET_AUTH_MODAL_UI,
  TypeUi
})


export const isFetchingRquest = (toggle: boolean) => ({
  type: Types.IS_FETCHING,
  toggle
})