import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useSpring, animated as a } from 'react-spring'
import { withRouter } from "react-router-dom"
import search from '../../media/img/search.png'
import { getUserInputMoviesRequest, getUserInputSeriesRequest } from '../../redux/actions/apiActions'
import { userHasTypedRequest } from '../../redux/actions/uiActions'
import * as INT from '../../helpers/interfaces'
import { RouteComponentProps } from "react-router";
import useWindowSize from '@rehooks/window-size';

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

  let ww = useWindowSize();

  const [change, setChange] = useState<string>('')

  useEffect((): void => {
    if (isMovieCatSelected && scrolled < 30) {
      setChange('')
    } else if (isSerieCatSelected && scrolled < 30) {
      setChange('')
    }
  }, [scrolled, isMovieCatSelected, isSerieCatSelected])

  const handleChange = (e: InputVal): void => {
    setChange(e.target.value)
  }

  const handleKeyUp = (): void => {
    if (isMovieCatSelected && change.length > 1) {
      history.push('/results')
      getUserInputMoviesRequest(change)
      userHasTypedRequest(change)
    } else if (!isMovieCatSelected && change.length > 1) {
      history.push('/results')
      getUserInputSeriesRequest(change)
      userHasTypedRequest(change)
    }
  }

  const animateBorder = useSpring<INT.IAnimateInput>({
    borderWidth: scrolled > 30 ? 1 : 0
  })

  const animateHide = useSpring<INT.IAnimateInputHide>({
    transform: scrolled > 30
      ? 'translate3d(-200%, 0, 0)'
      : 'translate3d(0%, 0, 0)'
  })

  const animateImg = useSpring<INT.IAnimateInputImg>({
    right: scrolled > 30
      ? '200%'
      : '0%'
  })



  return (
    <div
      className="search-input"
      data-test="component-search-input"
    >
      <a.input
        type="text"
        name="search"
        className="search-input__inp"
        data-test="search-input"
        placeholder="Search"
        style={
          ww.innerWidth > 668
            ? animateBorder
            : animateHide
        }
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        value={change}
      />
      <a.img
        src={search}
        alt="search"
        style={
          ww.innerWidth > 668
            ? animateBorder
            : animateImg
        }
        className="search-input__img" />
    </div>
  )
}


const mapStateToProps = (state: any) => {
  return {
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    isSerieCatSelected: state.uiReducer.isSerieCatSelected
  }
}


export default withRouter(connect(
  mapStateToProps,
  {
    getUserInputMoviesRequest,
    getUserInputSeriesRequest,
    userHasTypedRequest
  }
)(UnconnectedSearchInput))


