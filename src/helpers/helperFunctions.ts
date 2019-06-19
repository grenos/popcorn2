import React, { useRef, useEffect } from 'react'

export const filterNoImg = (baseUrl: string, poster: string, placeholder: string): string => {
  if (poster === '' || poster === null || poster === undefined) {
    return placeholder
  } else {
    return baseUrl + poster
  }
}


export const makeDashesUrl = (str: string): string => {
  if (str) {
    return str.replace(/\s+/g, '_')
  } else {
    return
  }
}


export const usePrevious = (value: any): any => {
  const ref = useRef()

  useEffect(() => {
    ref.current = value;
  }, [value])

  return ref
}