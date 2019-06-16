
export const filterNoImg = (baseUrl, poster, placeholder) => {
  if (poster === '' || poster === null || poster === undefined) {
    return placeholder
  } else {
    return baseUrl + poster
  }
}


export const makeDashesUrl = str => {
  if (str) {
    return str.replace(/\s+/g, '_')
  } else {
    return
  }
}

