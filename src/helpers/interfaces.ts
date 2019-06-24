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
  background: number | string
  boxShadow: number | string
}

export interface IAnimateInputContainer {
  opacity: number
}

export interface IAnimateInput {
  borderWidth: number
}

export interface IAnimateChevron {
  transform: string
}

export interface IAnimateHighlight {
  height: string
}

export interface IAnimateOpacity {
  opacity: number
}

export interface IInputProps {
  scrolled: number
  getUserInputMoviesRequest?: any
  getUserInputSeriesRequest?: any
  isMovieCatSelected: boolean
  isSerieCatSelected: boolean
  userHasTypedRequest: Function
  store?: any
}

export interface IToggleProps {
  getToggleMovieCatRequest: Function
  getToggleSerieCatRequest: Function
  clearMoviesByGenreState: Function
  clearSeriesByGenreState: Function
  store?: any
}

export interface IToggleMenuProps {
  getToggleMenuRequest: Function
  store?: any
}

export interface ISearchMovies {
  type: string
  result: Array<IMovie>
  id: number
}


export interface ISearchMovieInfo {
  type: string
  id: number
}

export interface ISearchMovieInfoResults {
  type: string
  result: IMovieInfoRes
  id: number
}

export interface ISearchSeries {
  type: string
  result: Array<ISerie>
  id: number
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
  readonly searchMovies: Array<IMovie>
  readonly topMovies: Array<IMovie>
  readonly movieGenres: IGenresResult[]
  readonly moviesByGenre: Array<IMovie>
  readonly movieCategoryId: number
  readonly movieInfo: IMovieInfoRes | any
}


export interface ISeriesState {
  readonly searchSeries: Array<ISerie>
  readonly topSeries: Array<ISerie>
  readonly serieGenres: IGenresResult[]
  readonly seriesByGenre: Array<ISerie>
  readonly serieCategoryId: number
  readonly serieInfo: IMovieInfoRes | any
}

export interface IUiState {
  readonly isMenuOpenProp: boolean
  readonly isMovieCatSelected: boolean
  readonly isSerieCatSelected: boolean
  readonly userHasTyped: ''
  readonly TopItemsActive: boolean
  readonly SearchItemsActive: boolean
  readonly genreItemsActive: boolean
  readonly isMovieModalOpen: boolean
}


export interface IInputSagaProps {
  inputValue: string
}

export interface IMovieInfoSagaProps {
  id: number
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
  userHasTyped?: string
  moviesId?: number
  seriesId?: number
  TopItemsActive: boolean
  SearchItemsActive: boolean
  genreItemsActive: boolean,
  isMovieModalOpen: boolean
  openMovieModalRequest: Function
}

export interface IVisoreProps {
  isMovieCatSelected: boolean
  store?: any
  topMovies: Array<IMovie>
  topSeries: Array<ISerie>
}

export interface IHighlightProps {
  isMovieCatSelected: boolean
  store?: any
  searchMovies: Array<IMovie>
  searchSeries: Array<ISerie>
}

export interface IModalProps {
  id: number
  store?: any
  backdrop_path: string
  title: string
  overview: string,
  isMovieModalOpen: boolean
  openMovieModalRequest: Function
  getMovieInfoRequest: Function
  getSerieInfoRequest: Function
  isMovieCatSelected: boolean
  props?: any
  movieInfo: IMovieInfoRes
  serieInfo: IMovieInfoRes
}

export interface ITopResultsPage {
  isMovieCatSelected: boolean
  store?: any
  topMovies: Array<IMovie>
  topSeries: Array<ISerie>
  getToggleMoviesRequest: Function
  getToggleSeriesRequest: Function
  TopItemsActive: Function
}

export interface IGenreResultsPage {
  isMovieCatSelected: boolean
  store?: any
  moviesByGenre: Array<IMovie>
  seriesByGenre: Array<ISerie>
  getMoviesByGenreRequest: Function
  getSeriesByGenreRequest: Function
  movieCategoryId: number
  serieCategoryId: number
  genreItemsActive: Function
}

export interface ITopSearchResultsPage {
  isMovieCatSelected: boolean
  store?: any
  searchMovies: Array<IMovie>
  searchSeries: Array<ISerie>
  getUserInputMoviesRequest: Function
  getUserInputSeriesRequest: Function
  userHasTyped: string
  SearchItemsActive: Function
}

export interface IMenuPropSingle {
  isMenuOpenProp: boolean
  store?: any
}

export interface IMenuSlideAction {
  type: string
  payload: boolean
}

export interface IVideos {
  results: Array<ITrailer>
  // allMovieVids?: Array<ITrailer>
  // allSerieVids?: Array<ITrailer>
  // videos?: Array<ITrailer>
}

export interface ITrailer {
  id: string
  iso_639_1: string
  iso_3166_1: string
  key: string
  name: string
  site: string
  size: number
  type: string
}

export interface IGenres {
  id: number
  name: string
}

export interface ISimilar {
  page: number
  results: Array<IMovie>
  total_pages: number
  total_results: number
}


export interface IMovieInfoRes {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: any
  budget: number
  genres: Array<IGenres>
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: any
  production_countries: any
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: any
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  videos: IVideos
  similar: ISimilar
}

