import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as INT from '../../helpers/interfaces'
import { openAuthModal, setAuthModalUI, isFetchingRquest } from '../../redux/actions/uiActions'
import { Transition } from 'react-spring/renderprops.cjs'
import IMG from '../../media/img/index'
import isEmail from 'validator/lib/isEmail';
import { Auth } from 'aws-amplify';
import Loader from '../Loader/Loader'

type InputVal = React.ChangeEvent<HTMLInputElement>
type PreventDefault = React.FormEvent<HTMLFormElement>

interface LocalState {
  email: string,
  password: string,
  emailError: boolean,
  passError: boolean,
  show: boolean
  code: any
  serverError: string
}

/**
 * confirm new password with secret code
 * @class
  * @param {Function} openAuthModal Action - to close modal
  * @param {boolean} isConfirmModalOpen used for animation
  * @param {Function} setAuthModalUI Action - on submit success open success component modal
  * @param {Function} isFetchingRquest Action - set to true for loading spinner
  * @param {boolean} isFetching 
 * @returns {JSX.Element} - Rendered Component 
 */
class ForgotPass extends Component<INT.IForgotPass, LocalState> {
  constructor(props: INT.IForgotPass) {
    super(props);

    this.state = {
      email: '',
      password: '',
      emailError: false,
      passError: false,
      show: false,
      code: '',
      serverError: ''
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleSecretCode = this.handleSecretCode.bind(this)
  }

  handleClose(): void {
    this.props.openAuthModal(false)
  }


  handleEmail(e: InputVal): void {
    this.setState({
      email: e.target.value,
      emailError: false,
      show: false
    })
  }

  handlePassword(e: InputVal): void {
    this.setState({
      password: e.target.value,
      passError: false,
      show: false
    })
  }

  handleSecretCode(e: InputVal): void {
    this.setState({
      code: e.target.value,
      passError: false,
      show: false
    })
  }


  handleSignUp(event: PreventDefault): void {
    event.preventDefault()
    const { email, password, code } = this.state
    const { isFetchingRquest } = this.props

    // email
    if (!isEmail(email)) {
      this.setState({ emailError: true, show: true })
    }

    // small password
    if (password.length < 8) {
      this.setState({ passError: true, show: true })
    }


    // success
    if (isEmail(email)
      && (password.length >= 8)) {
      isFetchingRquest(true)
      Auth.forgotPasswordSubmit(
        email,
        code,
        password
      ).then(() => {
        isFetchingRquest(false)
        // show success modal
        this.props.setAuthModalUI!(4)
      })
        .catch((err: any) => {
          isFetchingRquest(false)
          this.setState({ serverError: err.message })
          console.log(this.state.serverError);
        })
    }
  }

  render() {
    const { emailError, passError, show, serverError } = this.state
    const { isConfirmModalOpen, isFetching } = this.props

    return (
      <>
        <Transition
          items={!isConfirmModalOpen}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          {isConfirmModalOpen => isConfirmModalOpen && (animVal =>
            <div className="modal-inner" style={animVal}>
              <img src={String(IMG.close)}
                alt="close modal"
                className="close-log-modal"
                onClick={this.handleClose} />
              <div className="logo-title">
                <img src={String(IMG.logo)} alt="logo" />
                <h3>Confirm Password</h3>
              </div>

              <div className="forfot-pass-info">
                <p>
                  Check your inbox for our email containing the confirmation code.
                </p>
              </div>

              <form onSubmit={this.handleSignUp}>
                <div className="form-group">
                  <label>
                    Email*
                    <input
                      type="text"
                      value={this.state.email}
                      onChange={this.handleEmail}
                      className={emailError ? 'error' : ''}
                    />
                    <p className={emailError && show ? 'show' : ''} >Please fill in your email</p>
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    New Password*
                    <input
                      type="password"
                      value={this.state.password}
                      onChange={this.handlePassword}
                      className={passError ? 'error' : ''}
                    />
                    <p className={passError && show ? 'show' : ''} >At least 8 characters long</p>
                  </label>
                  <label>
                    Secret Code
                    <input
                      type="text"
                      value={this.state.code}
                      onChange={this.handleSecretCode}
                    />
                    <p className={serverError && show ? 'show' : ''} >Try Again</p>
                  </label>
                </div>
                {isFetching && <Loader />}
                <input type="submit" value="Submit" />
                {serverError && <div className="login-error"> <p>{serverError}</p> </div>}
              </form>
            </div>
          )}
        </Transition>
      </>
    )
  }
}


const mapStateToProps = (state: any) => {
  return {
    isAuthModalOpen: state.uiReducer.isAuthModalOpen,
    isConfirmModalOpen: state.uiReducer.isConfirmModalOpen,
    isFetching: state.uiReducer.isFetching,
  }
}

export default connect(mapStateToProps, {
  openAuthModal,
  setAuthModalUI,
  isFetchingRquest
})(ForgotPass)


