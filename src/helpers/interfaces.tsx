
export interface IAnimateImg {
  width: number | string,
  marginTop: number | string,
  transform: number | string,
  opacity: number
}
export interface IAnimateHeader {
  height: number | string,
  background: number | string,
  boxShadow: number | string
}

export interface IInputContainer {
  opacity: number,
}

export interface IInput {
  width: string,
  pointerEvents: string
}

export interface IProps {
  scrolled: number,
  getUserInputRequest: any
}

export interface ISearchMovies {
  result: Array<IMovie>,
}

export interface IActions {
  type: string,
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


export interface IActionProps {
  payload: string
}

