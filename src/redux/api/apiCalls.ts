import axios from 'axios'


axios.defaults.baseURL = 'https://api.themoviedb.org/3'
const apikey: string = 'fdde855cd4b047fb1a0ea24a7ec58362';


export const getUserInput = async (value: string): Promise<{}> => {
  const res = await axios.get(`/search/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&query=${value}`)
  return res
}

