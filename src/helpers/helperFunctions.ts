
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
