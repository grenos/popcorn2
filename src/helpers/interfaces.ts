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
  IMoviesByGenreSagaProps
|--------------------------------------------------
*/

export interface IScrollProps {
  scrolled: number
}

export interface IAnimateLogo {
  transform: number | string
  opacity: number
}

export interface IAnimateToggle {
  transform: number | string
  opacity?: number
}

export interface IAnimateMenu {
  transform: number | string
}

export interface IAnimateHeader {
  height: number | string
  background: number | string
  boxShadow: number | string
}

export interface IAnimateInputContainer {
  opacity: number
}

export interface IAnimateInput {
  width: string
  pointerEvents: string
}

export interface IInputProps {
  scrolled: number
  getUserInputMoviesRequest?: any
  getUserInputSeriesRequest?: any
  isMovieCatSelected: boolean
  isSerieCatSelected: boolean
  store?: any
}

export interface IToggleProps {
  scrolled: number
  getToggleMovieCatRequest: Function
  getToggleSerieCatRequest: Function
  store?: any
}

export interface IToggleMenuProps {
  getToggleMenuRequest: Function
  store?: any
}

export interface ISearchMovies {
  type: string
  result: Array<IMovie>
}

export interface ISearchSeries {
  type: string
  result: Array<ISerie>
}

export interface IToggleCat {
  type?: string
  payload: boolean
}

export interface IGenresAction {
  type: string
  result: IGenresResult
}

export interface IGenresResult {
  id: number
  name: string
}


export interface ISeriesReducer {
  type: string
  payload: | Array<ISerie>
}

export interface IMoviesReducer {
  type: string
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
  original_name: string
  id: number
  name: string
  popularity: number
  vote_count: number
  vote_average: number
  first_air_date: string
  poster_path: string
  genre_ids: number[]
  original_language: string
  backdrop_path: string
  overview: string
  origin_country: string[]
}

export interface IMoviesState {
  searchMovies: Array<IMovie>
  topMovies: Array<IMovie>
  movieGenres: IGenresResult[]
  moviesByGenre: Array<IMovie>
}



export interface ISeriesState {
  searchSeries: Array<ISerie>
  topSeries: Array<ISerie>
  serieGenres: IGenresResult[]
  seriesByGenre: Array<ISerie>
}

export interface IUiState {
  isMenuOpenProp: boolean
  isMovieCatSelected: boolean
  isSerieCatSelected: boolean
}


export interface IInputSagaProps {
  inputValue: string
  page: number
}

export interface IToggleSagaProps {
  payload: number
}

export interface IGetByGenreSagaProps {
  type: string
  id: number
  page: number
}

export interface IMenuProps {
  isMenuOpenProp: boolean
  store?: any
  movieGenres: IGenresResult[]
  serieGenres: IGenresResult[]
  getMoviesByGenreRequest: Function
  getSeriesByGenreRequest: Function
  isMovieCatSelected: boolean
  getMovieGenresRequest: Function
  getSerieGenresRequest: Function
}

export interface ITopResultsProps {
  isMovieCatSelected: boolean
  store?: any
  movies: Array<IMovie>
  series: Array<ISerie>
  getMovies: Function
  getSeries: Function
}

export interface ITopResultsPage {
  isMovieCatSelected: boolean
  store?: any
  topMovies: Array<IMovie>
  topSeries: Array<ISerie>
  getToggleMoviesRequest: Function
  getToggleSeriesRequest: Function
}

export interface ITopSearchResultsPage {
  isMovieCatSelected: boolean
  store?: any
  searchMovies: Array<IMovie>
  searchSeries: Array<ISerie>
  getUserInputMoviesRequest: Function
  getUserInputSeriesRequest: Function
}

export interface IMenuPropSingle {
  isMenuOpenProp: boolean
}

export interface IMenuSlideAction {
  type: string
  payload: boolean
}


