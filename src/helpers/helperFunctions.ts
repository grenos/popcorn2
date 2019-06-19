import React, { useRef, useEffect } from 'react'

export const filterNoImg = (baseUrl: string, poster: string, placeholder: string): string => {
  if (poster === '' || poster === null || poster === undefined) {
    return placeholder
  } else {
    return baseUrl + poster
  }
}


export const makeDashesUrl = (str: string): any => {
  if (str) {
    return str.replace(/\s+/g, '_')
  } else {
    return
  }
}


export function usePrevious(value: any): any {
  const ref = useRef()
  useEffect(() => {
    ref.current = value;
  }, [value])
  console.log(ref);

  return ref
}