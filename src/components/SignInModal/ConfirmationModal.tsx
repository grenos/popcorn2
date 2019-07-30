import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as INT from '../../helpers/interfaces'
import logo from '../../media/img/logo.png'
import { Transition } from 'react-spring/renderprops.cjs'
import { Auth } from 'aws-amplify'
import { openAuthModal, openConfirmModal, setAuthModalUI, isFetchingRquest, getToggleMenuRequest } from '../../redux/actions/uiActions'
import { saveUserInfo, userSignedIn } from '../../redux/actions/awsActions'
import Loader from '../Loader/Loader'

type InputVal = React.ChangeEvent<HTMLInputElement>
type PreventDefault = React.FormEvent<HTMLFormElement>
interface LocalState {
  confirmationCode: string,
  serverErrorLogin: string,
  serverErrorConfirm: string
}

class ConfirmationModal extends Component<INT.IConfirmSignUp, LocalState> {
  constructor(props: INT.IConfirmSignUp) {
    super(props)

    this.state = {
      confirmationCode: '',
      serverErrorLogin: '',
      serverErrorConfirm: ''
    }

    this.handleConfirm = this.handleConfirm.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
  }


  handlePassword(e: InputVal): void {
    this.setState({ confirmationCode: e.target.value })
  }

  handleConfirm(event: PreventDefault): void {
    event.preventDefault()
    const {
      email,
      openConfirmModal,
      password,
      isFetchingRquest,
      openAuthModal,
      saveUserInfo,
      userSignedIn,
      getToggleMenuRequest
    } = this.props
    const { confirmationCode } = this.state

    Auth.confirmSignUp(email, confirmationCode, {})
      .then(() => {
        isFetchingRquest(true)
        Auth.signIn(email, password)
          .then(user => {
            isFetchingRquest(false)
            openConfirmModal(false)
            openAuthModal(false)
            saveUserInfo(user)
            userSignedIn(true)
            getToggleMenuRequest()
          })
          .catch(err => {
            isFetchingRquest(false)
            this.setState({ serverErrorLogin: err.message })
            console.log(this.state.serverErrorLogin);
          })
      })
      .catch(err => {
        isFetchingRquest(false)
        this.setState({ serverErrorConfirm: err.message })
        console.log(this.state.serverErrorConfirm);
      })
  }

  render() {
    const { isConfirmModalOpen, isFetching } = this.props
    const { serverErrorLogin, serverErrorConfirm } = this.state
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
              {isFetching && <Loader />}
              <input type="submit" value="Confirm" />
              {serverErrorLogin && <div className="login-error"> <p>{serverErrorLogin}</p> </div>}
              {serverErrorConfirm && <div className="login-error"> <p>{serverErrorConfirm}</p> </div>}
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
    email: state.awsReducer.signup.email,
    isFetching: state.uiReducer.isFetching,
  }
}


export default connect(mapStateToProps, {
  saveUserInfo,
  userSignedIn,
  getToggleMenuRequest,
  openAuthModal,
  openConfirmModal,
  setAuthModalUI,
  isFetchingRquest
})(ConfirmationModal)