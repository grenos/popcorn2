import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useSpring, animated } from 'react-spring'
import search from '../../media/img/search.png'
import { getUserInputRequest } from '../../redux/actions/apiActions'


interface inputContainer {
  opacity: number,
}

interface input {
  width: string,
  pointerEvents: string
}

interface props {
  scrolled: number,
  getUserInputRequest: any
}


const SearchInput: React.FC<props> = ({ scrolled, getUserInputRequest }) => {

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

  const handleChange = (e: any) => {
    setChange(e.target.value)
  }

  const handleKeyUp = () => {
    getUserInputRequest(change)
  }


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
        onChange={(e) => handleChange(e)}
        onKeyUp={() => handleKeyUp()}
        value={change}
      />
      <img
        src={search}
        alt="search"
        className="search-input__img" />
    </animated.div>
  )
}


// pass null for mapStateToProps
export default connect(null, {
  getUserInputRequest
})(SearchInput);
