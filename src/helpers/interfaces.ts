/**
|--------------------------------------------------
  //! nav
  IAnimateImg 
  IAnimateHeader
  IScrollProps
  //! nav-input
  IAnimateInputContainer
  IAnimateInput
  IInputProps
  //! apiACtions
  ISearchMovies
  //! apiREducer
  IReducerActions
  //! apiState
  IApiState
  //! apiSags
  IInputSagaProps
|--------------------------------------------------
*/

export interface IScrollProps {
  scrolled: number
}

export interface IAnimateLogo {
  transform: number | string,
  opacity: number
}

export interface IAnimateToggle {
  transform: number | string,
  opacity?: number
}
export interface IAnimateHeader {
  height: number | string,
  background: number | string,
  boxShadow: number | string
}

export interface IAnimateInputContainer {
  opacity: number,
}

export interface IAnimateInput {
  width: string,
  pointerEvents: string
}

export interface IInputProps {
  scrolled: number,
  getUserInputRequest: Function,
  store?: any
}

export interface IToggleProps {
  scrolled: number,
}

export interface ISearchMovies {
  result: Array<IMovie>,
}

export interface IReducerActions {
  type: string,
  // use | <type of other payloads>
  payload: Array<IMovie>,
}

export interface IMovie {
  vote_count: number
  id: number
  video: boolean
  vote_average: number
  title: string
  popularity: number
  poster_path: string
  original_language: string
  original_title: string
  genre_ids: number[]
  backdrop_path: string
  adult: boolean
  overview: string
  release_date: string
}

export interface IApiState {
  searchMovies: Array<IMovie>,
}


export interface IInputSagaProps {
  payload: string
}

