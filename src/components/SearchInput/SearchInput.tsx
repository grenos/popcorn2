import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useSpring, animated } from 'react-spring'
import search from '../../media/img/search.png'
import { getUserInputMoviesRequest } from '../../redux/actions/apiActions'
import * as INT from '../../helpers/interfaces'


type InputVal = React.ChangeEvent<HTMLInputElement>

export const UnconnectedSearchInput: React.FC<INT.IInputProps> = ({
  scrolled, getUserInputMoviesRequest
}): JSX.Element => {

  const [change, setChange] = useState<string>('')

  useEffect((): void => {
    if (scrolled < 20) {
      setChange('')
    }
  }, [scrolled])


  const animateInputContainer = useSpring<INT.IAnimateInputContainer>({
    opacity: scrolled > 20 ? 1 : .1,
  })

  const animateInput = useSpring<INT.IAnimateInput>({
    width: scrolled > 20 ? '190px' : '21px',
    pointerEvents: scrolled > 20 ? 'all' : 'none'
  })

  const handleChange = (e: InputVal): void => {
    setChange(e.target.value)
  }

  const handleKeyUp = (): void => {
    change.length > 1 && getUserInputMoviesRequest(change)
  }

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


export default connect(null, { getUserInputMoviesRequest })(UnconnectedSearchInput)


