import { useRef, useState, useEffect, RefObject } from 'react'
import 'intersection-observer'

type UseVisibilityType = (
  node: RefObject<any>,
  options?: IntersectionObserverInit | undefined
) => IntersectionObserverEntry | object

const useVisibility: UseVisibilityType = (node, options = {}) => {
  const [visible, setVisibilty] = useState({})
  const isIntersecting = useRef({})

  const handleObserverUpdate: IntersectionObserverCallback = entries => {
    const ent = entries[0]

    if (isIntersecting.current !== ent.isIntersecting) {
      setVisibilty(ent)
      isIntersecting.current = ent.isIntersecting
    }
  }

  const observer = new IntersectionObserver(handleObserverUpdate, options)

  useEffect(() => {
    const element = node.current

    if (!element) {
      return
    }

    observer.observe(element)

    return function cleanup() {
      observer.unobserve(element)
    }
  })

  return visible
}

export { useVisibility }