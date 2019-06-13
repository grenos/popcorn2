import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useSpring, animated } from 'react-spring'
import { withRouter } from "react-router-dom"
import search from '../../media/img/search.png'
import { getUserInputMoviesRequest, getUserInputSeriesRequest } from '../../redux/actions/apiActions'
import { userHasTypedRequest } from '../../redux/actions/uiActions'
import * as INT from '../../helpers/interfaces'
import { RouteComponentProps } from "react-router";

type InputVal = React.ChangeEvent<HTMLInputElement>

export const UnconnectedSearchInput: React.FC<INT.IInputProps & RouteComponentProps> = ({
  scrolled,
  getUserInputMoviesRequest,
  getUserInputSeriesRequest,
  isMovieCatSelected,
  isSerieCatSelected,
  history,
  userHasTypedRequest
}): JSX.Element => {

  const [change, setChange] = useState<string>('')

  useEffect((): void => {
    if (isMovieCatSelected && scrolled < 20) {
      setChange('')
    } else if (isSerieCatSelected && scrolled < 20) {
      setChange('')
    }
  }, [scrolled, isMovieCatSelected, isSerieCatSelected])


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
    if (isMovieCatSelected && change.length > 1) {
      getUserInputMoviesRequest(change, 1)
      history.push('/results')
      userHasTypedRequest(change)
    } else {
      getUserInputSeriesRequest(change, 1)
      history.push('/results')
      userHasTypedRequest(change)
    }
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


const mapStateToProps = (state: any) => {
  return {
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    isSerieCatSelected: state.uiReducer.isSerieCatSelected
  };
};


export default withRouter(connect(
  mapStateToProps,
  {
    getUserInputMoviesRequest,
    getUserInputSeriesRequest,
    userHasTypedRequest
  }
)(UnconnectedSearchInput))


