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
  getToggleMenuRequest: Function
  openAuthModal: Function
  isUserSignedIn: boolean
  setAuthModalUI: Function
  store?: any
}

export interface IToggleMenuProps {
  getToggleMenuRequest: Function
  isMenuOpenProp: boolean
  store?: any
}

export interface ISearchMovies {
  type: string
  result: Array<IMovie>
  id: number
  name: string
}


export interface ISearchMovieInfoModal {
  type: string
  id: number
  title: string
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

export interface ISearchCastResults {
  type: string
  result: Array<ICast>
  id: number
}

export interface ICast {
  cast_id: number
  character: string
  credit_id: string
  gender: number
  id: number
  name: string
  order: number
  profile_path: string
  index?: number
}


export interface ISearchSeries {
  type: string
  result: Array<ISerie>
  id: number
  name: string
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
  name: string
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
  readonly movieInfo: IMovieInfoRes | any
  readonly movieInfoModal: IMovieInfoRes | any
  readonly cast: ICast[]
  readonly favMovies: Array<IFavMovie>
}

export interface IFavMovie {
  id: number
  poster: string
  genreId: number
  title?: string
  name?: string
}

export interface IFavMovieAction {
  type: string
  id: number
  poster: string
  genreId: number
  title?: string
  name?: string
}

export interface IMoviesByGenre {
  movieCategoryId: number
  action: Array<IMovie>
  adventure: Array<IMovie>
  animation: Array<IMovie>
  comedy: Array<IMovie>
  crime: Array<IMovie>
  documentary: Array<IMovie>
  drama: Array<IMovie>
  family: Array<IMovie>
  fantasy: Array<IMovie>
  history: Array<IMovie>
  horror: Array<IMovie>
  music: Array<IMovie>
  mystery: Array<IMovie>
  romance: Array<IMovie>
  science_fiction: Array<IMovie>
  tv_movie: Array<IMovie>
  thriller: Array<IMovie>
  war: Array<IMovie>
  western: Array<IMovie>
}


export interface ISeriesState {
  readonly searchSeries: Array<ISerie>
  readonly topSeries: Array<ISerie>
  readonly serieGenres: IGenresResult[]
  readonly serieInfo: IMovieInfoRes | any
  readonly serieInfoModal: IMovieInfoRes | any
  readonly favSeries: Array<IFavMovie>
}

export interface ISeriesByGenre {
  action_adventure: Array<ISerie>
  animation: Array<ISerie>
  comedy: Array<ISerie>
  documentary: Array<ISerie>
  drama: Array<ISerie>
  family: Array<ISerie>
  kids: Array<ISerie>
  crime: Array<ISerie>
  mystery: Array<ISerie>
  news: Array<ISerie>
  reality: Array<ISerie>
  scifi_fantasy: Array<ISerie>
  soap: Array<ISerie>
  talk: Array<ISerie>
  war_politics: Array<ISerie>
  western: Array<ISerie>
  serieCategoryId: number
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
  readonly isVideoSectionOpen: boolean
  readonly isSimilarSectionOpen: boolean
  readonly isMoreInfoOpen: boolean
  readonly isAuthModalOpen: boolean
  readonly isConfirmModalOpen: boolean
  readonly isRelatedMovieSelected: boolean
  readonly isAuthModalUI: number
  readonly isFetching: boolean
  readonly isFetchingTopItems: boolean
  readonly isTopItemError: any
}


export interface IInputSagaProps {
  inputValue: string
}

export interface IMovieInfoSagaProps {
  id: number
  title: string
}

export interface IToggleSagaProps {
  payload: number
}

export interface IGetByGenreSagaProps {
  type: string
  id: number
  page: number
  name: string
}

export interface IMenuProps {
  isMenuOpenProp: boolean
  openAuthModal: Function
  store?: any
  movieGenres: IGenresResult[]
  serieGenres: IGenresResult[]
  getMoviesByGenreRequest: Function
  getSeriesByGenreRequest: Function
  isMovieCatSelected: boolean
  getMovieGenresRequest: Function
  getSerieGenresRequest: Function
  userSignedIn: Function
  isUserSignedIn: boolean
  userInfo: any
  clearUserInfo: Function
  getToggleMenuRequest: Function
  setAuthModalUI: Function
  isAuthModalUI: number
}

export interface ITopResultsProps {
  isMovieCatSelected: boolean
  store?: any
  movies?: Array<IMovie>
  series?: Array<ISerie>
  getMovies?: Function
  getSeries?: Function
  userHasTyped?: string
  moviesId?: number
  seriesId?: number
  TopItemsActive: boolean
  isMovieModalOpen: boolean
  openMovieModalRequest: Function
  getToggleMovieCatRequest: Function
  getToggleSerieCatRequest: Function
  SearchItemsActive: boolean
  getMovieFavoriteRequest: Function,
  favMovies: IFavMovie[]
  favSeries: IFavMovie[]
  removeFavMovieRequest: Function
  getSerieFavoriteRequest: Function
  removeFavSerieRequest: Function
  isUserSignedIn: boolean
  isFetchingTopItems: boolean
}

export interface IVisoreProps {
  isMovieCatSelected: boolean
  store?: any
  topMovies: Array<IMovie>
  topSeries: Array<ISerie>
  getSerieInfoModalRequest: Function
  getMovieInfoModalRequest: Function
  getMovieFavoriteRequest: Function
  removeFavMovieRequest: Function
  getSerieFavoriteRequest: Function
  removeFavSerieRequest: Function
  favMovies: IFavMovie[]
  favSeries: IFavMovie[]
  relatedMovieSelected: Function
  isUserSignedIn: boolean
}

export interface IHighlightProps {
  isMovieCatSelected: boolean
  store?: any
  searchMovies: Array<IMovie>
  searchSeries: Array<ISerie>
  getMovieInfoModalRequest: Function
  getSerieInfoModalRequest: Function
  relatedMovieSelected: Function
  favMovies: IFavMovie[]
  favSeries: IFavMovie[]
  getMovieFavoriteRequest: Function
  removeFavMovieRequest: Function
  getSerieFavoriteRequest: Function
  removeFavSerieRequest: Function
  isUserSignedIn: boolean
}

export interface IModalProps {
  id: number
  store?: any
  backdrop_path: string
  poster_path: string
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
  isVideoSectionOpen: boolean
  openVideoSectionRequest: Function
  openSimilarSectionRequest: Function
  isSimilarSectionOpen: boolean
  isMoreInfoOpen: boolean
  openMoreInfoRequest: Function
  getCastRequest: Function
  getMovieFavoriteRequest: Function
  getSerieFavoriteRequest: Function
  favMovies: Array<IFavMovie>
  favSeries: Array<IFavMovie>
  removeFavMovieRequest: Function
  removeFavSerieRequest: Function
  isUserSignedIn: boolean
}

export interface IModal {
  modalType: number
  isAuthModalOpen: boolean
  openAuthModal: Function
}

export interface ILogin {
  openAuthModal: Function
  saveUserInfo: Function
  userSignedIn: Function
  getToggleMenuRequest: Function
  setAuthModalUI: Function
  isFetchingRquest: Function
  isFetching: boolean
}

export interface ISuccessModal {
  setAuthModalUI: Function
}

export interface IConfirmSignUp {
  isConfirmModalOpen: boolean
  openAuthModal: Function
  openConfirmModal: Function
  setAuthModalUI: Function
  password: string
  email: string
  isFetchingRquest: Function
  isFetching: boolean
  getToggleMenuRequest: Function
  saveUserInfo: Function
  userSignedIn: Function
}

export interface ISignUp {
  openAuthModal: Function
  makeSignUpGlobal: Function
  openConfirmModal: Function
  isConfirmModalOpen: boolean
  setAuthModalUI?: Function
  isFetchingRquest: Function
  isFetching: boolean
}

export interface IForgotPass {
  openAuthModal: Function
  openConfirmModal: Function
  isConfirmModalOpen: boolean
  setAuthModalUI?: Function
  isFetchingRquest: Function
  isFetching: boolean
}

export interface IPassReq {
  setAuthModalUI: Function
  isConfirmModalOpen: boolean
  isFetchingRquest: Function
  isFetching: boolean

}

export interface ISignupState {
  email: string,
  password: string,
  confirmPass: string,
  name: string,
}

export interface IRelatedVidProps {
  openVideoSectionRequest: Function
  videos: IVideos
  animation: any
}

export interface ISimilarProps {
  openSimilarSectionRequest: Function
  videos: ISimilar
  animation: any
  history: any
  location: any
  match: any
  getMovieInfoModalRequest: Function
  getSerieInfoModalRequest: Function
  isMovieCatSelected: boolean
  isRelatedMovieSelected: boolean
  relatedMovieSelected: Function
}

export interface IMoreInfoProps {
  openMoreInfoRequest: Function
  info: IMovieInfoRes
  animation: any
  cast: ICast[]
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
  getMoviesByGenreRequest: Function
  getSeriesByGenreRequest: Function
  movieCategoryId: number
  serieCategoryId: number
  genreItemsActive: Function
  movies: Array<IMovie>
  series: Array<ISerie>
  action: Array<IMovie>
  action_adventure: Array<ISerie>
  adventure: Array<IMovie>
  animation: Array<IMovie> | Array<ISerie>
  comedy: Array<IMovie> | Array<ISerie>
  crime: Array<IMovie>
  documentary: Array<IMovie> | Array<ISerie>
  drama: Array<IMovie> | Array<ISerie>
  family: Array<IMovie> | Array<ISerie>
  kids: Array<ISerie>
  fantasy: Array<IMovie>
  history: Array<IMovie>
  horror: Array<IMovie>
  music: Array<IMovie>
  mystery: Array<IMovie> | Array<ISerie>
  romance: Array<IMovie>
  science_fiction: Array<IMovie>
  tv_movie: Array<IMovie>
  thriller: Array<IMovie>
  war: Array<IMovie>
  western: Array<IMovie> | Array<ISerie>
  news: Array<ISerie>
  reality: Array<ISerie>
  scifi_fantasy: Array<ISerie>
  soap: Array<ISerie>
  talk: Array<ISerie>
  war_politics: Array<ISerie>
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
  isFetchingTopItems: boolean
}

export interface IMenuPropSingle {
  isMenuOpenProp: boolean
  store?: any
  userSignedIn: Function
}

export interface IMenuSlideAction {
  type: string
  payload: boolean
}

export interface IVideos {
  results: Array<ITrailer>
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

export interface IFavorites {
  favArrays: any
  removeFavMovieRequest: Function
  removeFavSerieRequest: Function
  favMovies: IFavMovie[]
  favSeries: IFavMovie[]
  getMovieInfoModalRequest: Function
  getSerieInfoModalRequest: Function
  isMovieCatSelected: boolean
  relatedMovieSelected: Function
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

  created_by: any
  episode_run_time: any
  first_air_date: any
  name: string
  number_of_seasons: any
}

export interface ITitlePageProps {
  movieInfoModal: IMovieInfoRes
  serieInfoModal: IMovieInfoRes
  isMovieModalOpen: boolean
  isMovieCatSelected: boolean
  isRelatedMovieSelected: boolean
}

export interface ITitleModalProps {
  movieInfo: IMovieInfoRes
  isMovieModalOpen: boolean
  show: boolean
}