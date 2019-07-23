import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as INT from '../../helpers/interfaces'
import logo from '../../media/img/logo.png'
import { Transition } from 'react-spring/renderprops.cjs'
import { Auth } from 'aws-amplify'
import { openAuthModal, openConfirmModal, setAuthModalUI } from '../../redux/actions/uiActions'

type InputVal = React.ChangeEvent<HTMLInputElement>
type PreventDefault = React.FormEvent<HTMLFormElement>
interface LocalState {
  confirmationCode: string,
}

class ConfirmationModal extends Component<INT.IConfirmSignUp, LocalState> {
  constructor(props: INT.IConfirmSignUp) {
    super(props)

    this.state = {
      confirmationCode: '',
    }

    this.handleConfirm = this.handleConfirm.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
  }


  handlePassword(e: InputVal): void {
    this.setState({ confirmationCode: e.target.value })
  }

  handleConfirm(event: PreventDefault): void {
    event.preventDefault()
    const { email, openAuthModal, openConfirmModal, setAuthModalUI } = this.props
    const { confirmationCode } = this.state

    Auth.confirmSignUp(email, confirmationCode, {})
      .then(() => {
        setAuthModalUI(1)
        openConfirmModal(false)
      })
      .catch(err => console.log(err.message));
  }

  render() {
    const { isConfirmModalOpen } = this.props
    return (
      <Transition
        delay={700}
        items={isConfirmModalOpen}
        from={{ transform: 'translate3d(0, 100%, 0)', opacity: 0, display: 'none' }}
        enter={{ transform: 'translate3d(0, 0%, 0)', opacity: 1, display: 'block' }}
        leave={{ transform: 'translate3d(0, 0%, 0)', opacity: 0 }}>
        {isConfirmModalOpen => isConfirmModalOpen && (animVal =>
          <div className="modal-inner" style={{ ...animVal }}>
            <div className="logo-title">
              <img src={logo} alt="logo" />
              <h3>Confirm Account</h3>
            </div>
            <form onSubmit={this.handleConfirm}>
              <div className="form-group">
                <label>
                  Confirmation Code
              <input
                    type="text"
                    value={this.state.confirmationCode}
                    onChange={this.handlePassword}
                  />
                </label>
              </div>
              <input type="submit" value="Confirm" />
            </form>
          </div>
        )}
      </Transition>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    isConfirmModalOpen: state.uiReducer.isConfirmModalOpen,
    isAuthModalOpen: state.uiReducer.isAuthModalOpen,
    email: state.awsReducer.signup.email
  }
}


export default connect(mapStateToProps, {
  openAuthModal,
  openConfirmModal,
  setAuthModalUI
})(ConfirmationModal)