import axios from 'axios'


axios.defaults.baseURL = 'https://api.themoviedb.org/3'
const apikey: string = 'fdde855cd4b047fb1a0ea24a7ec58362';


export const getUserInputMovies = async (value: string): Promise<{}> => {
  const res = await axios.get(`/search/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&query=${value}`)
  return res
}

export const getUserInputSeries = async (value: string): Promise<{}> => {
  const res = await axios.get(`/search/serie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&query=${value}`)
  return res
}



export const getToggleMovies = async (page: number): Promise<{}> => {
  const res = await axios.get(`/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`)
  return res
}
export const getToggleSeries = async (page: number): Promise<{}> => {
  const res = await axios.get(`/discover/tv?api_key=${apikey}&language=en-US&sort_by=popularity.desc&page=${page}`)
  return res
}