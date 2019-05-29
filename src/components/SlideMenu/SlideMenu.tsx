import React from 'react'
import { animated } from 'react-spring'
import Scrollbars from 'react-custom-scrollbars'
import * as INT from '../../helpers/interfaces'


const SlideMenu: React.FC<INT.ISlideMenuProps> = ({
  props, key }): JSX.Element => {

  return (
    <animated.div className="nav-wrapper"
      style={props}
      key={key}>
      <div className="nav-list-wrapper">
        <Scrollbars className="nav-list">
          <h3>test</h3>
        </Scrollbars>
      </div>
    </animated.div >
  )
}

export default SlideMenu



