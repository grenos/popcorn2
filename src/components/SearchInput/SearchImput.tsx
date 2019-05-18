import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import search from '../../media/img/search.png'


interface inputContainer {
  opacity: number,
}

interface input {
  width: string,
  pointerEvents: string
}


const SearchInput: React.FC<{ scrolled: number }> = ({ scrolled }) => {

  const [change, setChange] = useState<string>('')

  useEffect(() => {
    if (scrolled < 20) {
      setChange('')
    }
  }, [scrolled])

  const animateInputContainer = useSpring<inputContainer>({
    opacity: scrolled > 20 ? 1 : .1,
  })

  const animateInput = useSpring<input>({
    width: scrolled > 20 ? '190px' : '21px',
    pointerEvents: scrolled > 20 ? 'all' : 'none'
  })


  return (
    <animated.div
      className="search-input"
      data-testid="first-child"
      style={animateInputContainer}>
      <animated.input
        type="text"
        name="search"
        className="search-input__inp"
        style={animateInput}
        onChange={(e) => setChange(e.target.value)}
        value={change}
      />
      <img
        src={search}
        alt="search"
        className="search-input__img" />
    </animated.div>
  )
}


export default SearchInput