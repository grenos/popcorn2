import React, { Component } from 'react'
import { connect } from 'react-redux'
import { openAuthModal, getToggleMenuRequest, setAuthModalUI, isFetchingRquest } from '../../redux/actions/uiActions'
import { saveUserInfo, userSignedIn } from '../../redux/actions/awsActions'
import * as INT from '../../helpers/interfaces'
import logo from '../../media/img/logo.png'
import close from '../../media/img/close.png'
import isEmail from 'validator/lib/isEmail'
import { Auth } from 'aws-amplify'
import Loader from '../Loader/Loader'

type InputVal = React.ChangeEvent<HTMLInputElement>
type PreventDefault = React.FormEvent<HTMLFormElement>
interface LocalState {
  email: string,
  password: string,
  serverError: string
  emailError: boolean,
  passError: boolean,
  show: boolean
}

class Login extends Component<INT.ILogin, LocalState> {
  constructor(props: INT.ILogin) {
    super(props);
    this.state = {
      email: '',
      password: '',
      serverError: '',
      show: false,
      emailError: false,
      passError: false,
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleForgotPass = this.handleForgotPass.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
  }


  handleClose(): void {
    this.props.openAuthModal(false)
  }

  handleEmail(e: InputVal): void {
    this.setState({ email: e.target.value })
  }

  handlePassword(e: InputVal): void {
    this.setState({ password: e.target.value })
  }


  handleLogin(event: PreventDefault): void {
    event.preventDefault()
    const { email, password } = this.state
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
      && (password.length > 7)) {
      isFetchingRquest(true)
      Auth.signIn(email, password)
        .then(user => {
          isFetchingRquest(false)
          this.props.openAuthModal(false)
          this.props.saveUserInfo(user)
          this.props.userSignedIn(true)
          this.props.getToggleMenuRequest()
        })
        .catch(err => {
          isFetchingRquest(false)
          this.setState({ serverError: err.message })
          console.log(this.state.serverError);
        })
    }
  }

  handleForgotPass() {
    this.props.setAuthModalUI(5)
  }

  handleSignUp() {
    this.props.setAuthModalUI(2)
  }

  render() {

    const { emailError, passError, show, serverError } = this.state
    const { isFetching } = this.props

    return (
      <div className="modal-inner">
        <img src={close}
          alt="close modal"
          className="close-log-modal"
          onClick={this.handleClose} />
        <div className="logo-title">
          <img src={logo} alt="logo" />
          <h3>Log In</h3>
        </div>

        <form onSubmit={this.handleLogin}>
          <div className="form-group">

            <label>
              Email:
              <input
                type="text"
                value={this.state.email}
                onChange={this.handleEmail}
                className={emailError ? 'error' : ''}
              />
              <p className={emailError && show ? 'show' : ''} >Incorect email</p>
            </label>

            <label>
              Password:
              <input
                type="password"
                value={this.state.password}
                onChange={this.handlePassword}
                className={passError ? 'error' : ''}
              />
              <p className={passError && show ? 'show' : ''} >At least 8 characters long</p>
            </label>

          </div>
          {isFetching && <Loader />}
          <input type="submit" value="Log In" />
          {serverError && <div className="login-error"> <p>{serverError}</p> </div>}
        </form>
        <div className="forgot-pass">
          <p>Forgot password?</p> <span onClick={this.handleForgotPass}>Click here</span>
        </div>
        <div className="send-to-signup">
          <p>Not have an account yet?</p> <span onClick={this.handleSignUp}>Sign Up</span>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state: any) => {
  return {
    isFetching: state.uiReducer.isFetching,
  }
}


export default connect(mapStateToProps, {
  openAuthModal,
  saveUserInfo,
  userSignedIn,
  getToggleMenuRequest,
  setAuthModalUI,
  isFetchingRquest
})(Login)