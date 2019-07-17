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


export const categorizeArrays = (arr1: INT.IFavMovie[], arr2: INT.IFavMovie[]) => {
  const arrays = arr1.concat(arr2)
  const filteredArrays = arrays.reduce((acc, item) => {
    switch (item.genreId) {
      case 28:
        acc.action.push(item)
        break
      case 12:
        acc.adventure.push(item)
        break
      case 16:
        acc.animation.push(item)
        break
      case 35:
        acc.comedy.push(item)
        break
      case 80:
        acc.crime.push(item)
        break
      case 99:
        acc.documentary.push(item)
        break
      case 18:
        acc.drama.push(item)
        break
      case 10751:
        acc.family.push(item)
        break
      case 14:
        acc.fantasy.push(item)
        break
      case 36:
        acc.history.push(item)
        break
      case 27:
        acc.horror.push(item)
        break
      case 10402:
        acc.music.push(item)
        break
      case 9648:
        acc.mystery.push(item)
        break
      case 10749:
        acc.romance.push(item)
        break
      case 878:
        acc.science_fiction.push(item)
        break
      case 10770:
        acc.tv_movie.push(item)
        break
      case 53:
        acc.thriller.push(item)
        break
      case 10752:
        acc.war.push(item)
        break
      case 37:
        acc.western.push(item)
        break
      // series
      case 10759:
        acc.adventure.push(item)
        break
      case 10762:
        acc.animation.push(item)
        break
      case 10763:
        acc.news.push(item)
        break
      case 10764:
        acc.reality.push(item)
        break
      case 10765:
        acc.science_fiction.push(item)
        break
      case 10766:
        acc.soap.push(item)
        break
      case 10767:
        acc.talk.push(item)
        break
      case 10768:
        acc.war.push(item)
        break
      default:
        return acc
    }
    return acc
  },
    {
      action: [],
      adventure: [],
      animation: [],
      comedy: [],
      crime: [],
      documentary: [],
      drama: [],
      family: [],
      fantasy: [],
      history: [],
      horror: [],
      music: [],
      mystery: [],
      romance: [],
      science_fiction: [],
      tv_movie: [],
      thriller: [],
      war: [],
      western: [],
      news: [],
      reality: [],
      sopa: [],
      talk: []
    } as any
  )

  return filteredArrays
}