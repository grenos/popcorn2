import * as INT from '../../helpers/interfaces'


export const Types: any = {
  GET_MENU_TOGGLE_REQUEST: 'GET_MENU_TOGGLE_REQUEST',
  GET_MENU_TOGGLE_SUCCESS: 'GET_MENU_TOGGLE_SUCCESS'
}


export const getToggleMenuRequest = (isMenuOpen: boolean) => ({
  type: Types.GET_MENU_TOGGLE_REQUEST,
  payload: isMenuOpen
})

export const getToggleMenuSuccess = (isMenuOpen: boolean) => ({
   type: Types.GET_MENU_TOGGLE_SUCCESS,
   payload: isMenuOpen
 })


