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
  //! nav-input
  IToggleSagaProps
  //! Actions 
  ISearchMovies
  ISearchSeries
  IGenres
  //! REducer
  IMoviesReducer
  ISeriesReducer
  //! State
  IMoviesState
  ISeriesState
  //! Sagas
  IInputSagaProps
  IToggleSagaProps
  IToggleMovieCat
  IToggleSerieCat
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

export interface IAnimateMenu {
  transform: number | string,
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

export interface IToggleMenuProps {
  getToggleMenuRequest: Function,
  getMovieGenresRequest: Function,
  getSerieGenresRequest: Function
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

export interface IToggleCat {
  type: string,
  payload: boolean
}

export interface IGenresAction {
  type: string,
  result: IGenresResult
}

export interface IGenresResult {
  id: number,
  name: string,
  opacity?: number
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
  movieGenres: IGenresResult[]
}



export interface ISeriesState {
  searchSeries: Array<ISerie>,
  topSeries: Array<ISerie>,
  serieGenres: IGenresResult[]
}

export interface IUiState {
  isMenuOpen: boolean,
  isMovieCatSelected: boolean,
  isSerieCatSelected: boolean
}


export interface IInputSagaProps {
  payload: string
}

export interface IToggleSagaProps {
  payload: number
}

export interface IMenuProps {
  isMenuOpen: boolean,
  store?: any,
  movieGenres: IGenresResult[],
  serieGenres: IGenresResult[],
  isMovieCatSelected: boolean
}

export interface IMenuPropSingle {
  isMenuOpen: boolean,
}

export interface IMenuSlideAction {
  type: string,
  payload: boolean
}


