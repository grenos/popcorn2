
export const filterNoImg = (baseUrl, poster, placeholder) => {
  if (poster === '' || poster === null || poster === undefined) {
    return placeholder
  } else {
    return baseUrl + poster
  }
}

