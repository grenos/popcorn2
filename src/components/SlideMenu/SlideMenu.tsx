import React from 'react'
import { connect } from 'react-redux'
import Scrollbars from 'react-custom-scrollbars'
import * as INT from '../../helpers/interfaces'
import { useTransition, animated as a } from 'react-spring'


export const UnconnectedSlideMenu: React.FC<INT.IMenuProps> = ({ isMenuOpen }): JSX.Element => {

  const transition = useTransition(isMenuOpen, null, {
    from: { transform: `translate3d(-100%,0,0)` },
    enter: { transform: `translate3d(0%,0,0)` },
    leave: { transform: `translate3d(-100%,0,0)` }
  })

  return (
    <>
      {
        transition.map(
          ({ item, key, props }) => (
            item &&
            <a.div className="nav-wrapper" style={props} key={key}>
              <div className="nav-list-wrapper">
                <Scrollbars className="nav-list">
                  <h3>test</h3>
                </Scrollbars>
              </div>
            </a.div >
          )
        )
      }
    </>
  )
}


const mapStateToProps = (state: any) => {
  return {
    isMenuOpen: state.uiReducer.isMenuOpen,
  };
};

export default connect(mapStateToProps, null)(UnconnectedSlideMenu)






