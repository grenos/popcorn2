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
  //! apiActions recieved from sagas
  ISearchMovies
  ISearchSeries
  //! apiREducer
  IMoviesReducer
  ISeriesReducer
  //! apiState
  IMoviesState
  ISeriesState
  //! apiSags
  IInputSagaProps
  IToggleSagaProps
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
  scrolled: number
  getUserInputMoviesRequest?: any,
  getUserInputSeriesRequest?: any,
  topMovies: Array<IMovie>,
  store?: any
}

export interface IToggleProps {
  scrolled: number,
  getToggleMoviesRequest: Function,
  getToggleSeriesRequest: Function,
  store?: any
}

export interface ISearchMovies {
  type: string,
  result: Array<IMovie>,
}

export interface ISearchSeries {
  type: string,
  result: Array<ISerie>,
}


export interface ISeriesReducer {
  type: string,
  payload: | Array<ISerie>
}

export interface IMoviesReducer {
  type: string,
  payload: Array<IMovie>
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

export interface ISerie {
  original_name: string,
  id: number,
  name: string,
  popularity: number,
  vote_count: number,
  vote_average: number,
  first_air_date: string,
  poster_path: string,
  genre_ids: number[],
  original_language: string,
  backdrop_path: string,
  overview: string,
  origin_country: string[]
}

export interface IMoviesState {
  searchMovies: Array<IMovie>,
  topMovies: Array<IMovie>,
}

export interface ISeriesState {
  searchSeries: Array<ISerie>,
  topSeries: Array<ISerie>
}


export interface IInputSagaProps {
  payload: string
}

export interface IToggleSagaProps {
  payload: number
}


