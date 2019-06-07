import React, { useState, useEffect } from 'react';
import { useSpring, animated as a } from 'react-spring';
import { connect } from 'react-redux'
import { getToggleMenuRequest } from '../../redux/actions/uiActions'
import { getMovieGenresRequest, getSerieGenresRequest } from '../../redux/actions/apiActions'
import chevron from '../../media/img/chevron.png'
import * as INT from '../../helpers/interfaces'


export const UnconnectedMenuToggle: React.FC<INT.IToggleMenuProps> = ({
  getToggleMenuRequest,
  getMovieGenresRequest,
  getSerieGenresRequest,
  isMovieCatSelected,
  isMenuOpenProp
}): JSX.Element => {

  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    getToggleMenuRequest(isMenuOpen)
  }, [getToggleMenuRequest, isMenuOpen])

  useEffect(() => {
    isMovieCatSelected
      ? getMovieGenresRequest()
      : getSerieGenresRequest()
  })

  const btnAnimation = useSpring<INT.IAnimateToggle>({
    transform: isMenuOpenProp
      ? `translate3d(200px,0,0)`
      : `translate3d(0px,0,0)`
  });

  const imgAnimation = useSpring<INT.IAnimateToggle>({
    transform: isMenuOpenProp
      ? `rotate(0deg)`
      : `rotate(540deg)`
  });

  const makeBoolGlobal = (): void => {
    setMenuOpen(isMenuOpen => !isMenuOpen)
  }

  return (
    <a.button
      data-test="button-toggle"
      className="menu-button"
      onClick={makeBoolGlobal}
      style={btnAnimation}
      type="button"
    >
      <a.img src={chevron}
        data-test="img-toggle"
        alt="Open Menu"
        style={imgAnimation}
      />
    </a.button>
  )
}

const mapStateToProps = (state: any) => {
  return {
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    isMenuOpenProp: state.uiReducer.isMenuOpenProp
  }
}

export default connect(mapStateToProps, {
  getToggleMenuRequest,
  getMovieGenresRequest,
  getSerieGenresRequest
})(UnconnectedMenuToggle)


