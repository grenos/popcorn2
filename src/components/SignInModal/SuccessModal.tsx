import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthModalUI } from '../../redux/actions/uiActions'
import * as INT from '../../helpers/interfaces'
import logo from '../../media/img/logo.png'

/**
 * Succes Component (Shown after password change)
 * @class
 * @param {function} setAuthModalUI - Action returns back to sign up modal after 3 seconds
 * @returns {JSX.Element}
 */
class SuccessModal extends Component<INT.ISuccessModal> {

  componentDidMount() {
    setTimeout(() => {
      this.props.setAuthModalUI(1)
    }, 3000);
  }

  render() {

    return (
      <div className="modal-inner">
        <div className="logo-title">
          <img src={logo} alt="logo" />
        </div>

        <div className="success-modal-message">
          <h3>Success</h3>
          <p>Your Password has been changed.</p>
        </div>
      </div>
    )
  }
}


export default connect(null, {
  setAuthModalUI
})(SuccessModal)