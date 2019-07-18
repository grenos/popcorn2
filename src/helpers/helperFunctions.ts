import * as INT from './interfaces'


export const filterNoImg = (baseUrl: string, poster: string, placeholder: string): string => {
  if (poster === '' || poster === null || poster === undefined) {
    return placeholder
  } else {
    return baseUrl + poster
  }
}


export const makeDashesUrl = (str: string): string | null => {
  if (str) {
    return str.replace(/\s+/g, '_')
  } else {
    return null
  }
}



export const reverseMe = (str: string): string => {
  return str.split('-').reverse().join(' - ')
}


export const compareArrValues = (arr1: INT.IFavMovie[], arr2: INT.IGenres[]): Array<string> => {
  const genreMatch: Array<string> = []
  arr1.map(it1 => arr2.map(it2 => {
    if (it1.genreId === it2.id) {
      genreMatch.push(it2.name)
    }
  }))
  return genreMatch
}
