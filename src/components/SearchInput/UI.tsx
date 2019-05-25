import React, { useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import search from '../../media/img/search.png'
import * as INT from '../../helpers/interfaces'


export const UI: React.FC<INT.IInputProps> = ({
  scrolled,
  handleChange,
  handleKeyUp,
  change,
  setChange
}): JSX.Element => {

  useEffect((): void => {
    if (scrolled < 20) {
      setChange('')
    }
  }, [scrolled, setChange])


  const animateInputContainer = useSpring<INT.IAnimateInputContainer>({
    opacity: scrolled > 20 ? 1 : .1,
  })

  const animateInput = useSpring<INT.IAnimateInput>({
    width: scrolled > 20 ? '190px' : '21px',
    pointerEvents: scrolled > 20 ? 'all' : 'none'
  })

  return (
    <animated.div
      className="search-input"
      data-test="component-search-input"
      style={animateInputContainer}>

      <animated.input
        type="text"
        name="search"
        className="search-input__inp"
        data-test="search-input"
        style={animateInput}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        value={change}
      />

      <img
        src={search}
        alt="search"
        className="search-input__img" />
    </animated.div>
  )
}


export default UI
