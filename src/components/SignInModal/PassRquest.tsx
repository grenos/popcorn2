import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as INT from '../../helpers/interfaces'
import { openAuthModal, openConfirmModal, setAuthModalUI } from '../../redux/actions/uiActions'
import { makeSignUpGlobal } from '../../redux/actions/awsActions'
import { Transition } from 'react-spring/renderprops.cjs'
import logo from '../../media/img/logo.png'
import isEmail from 'validator/lib/isEmail';
import { Auth } from 'aws-amplify';


type InputVal = React.ChangeEvent<HTMLInputElement>
type PreventDefault = React.FormEvent<HTMLFormElement>

interface LocalState {
  email: string,
  emailError: boolean
  show: boolean,
  serverError: string
}

class PassRquest extends Component<INT.IPassReq, LocalState> {
  constructor(props: INT.IPassReq) {
    super(props);

    this.state = {
      email: '',
      emailError: false,
      show: false,
      serverError: ''
    }

    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
  }

  handleEmail(e: InputVal): void {
    this.setState({
      email: e.target.value,
      emailError: false,
      show: false
    })
  }


  handleSignUp(event: PreventDefault): void {
    event.preventDefault()
    const { email } = this.state

    // email
    if (!isEmail(email)) {
      this.setState({ emailError: true, show: true })
    }

    // success
    if (isEmail(email)) {
      Auth.forgotPassword(email)
        .then(
          // call password reset modal
          this.props.setAuthModalUI(3)
        ).catch((err: any) => {
          this.setState({ serverError: err.message })
          console.log(this.state.serverError);
        })
    }
  }

  render() {
    const { emailError, show, serverError } = this.state
    const { isConfirmModalOpen } = this.props

    return (
      <Transition
        items={!isConfirmModalOpen}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {isConfirmModalOpen => isConfirmModalOpen && (animVal =>
          <div className="modal-inner" style={animVal}>
            <div className="logo-title">
              <img src={logo} alt="logo" />
              <h3>Forgot Password</h3>
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
              <input type="submit" value="Submit" />
              {serverError && <div className="login-error"> <p>{serverError}</p> </div>}
            </form>
          </div>
        )}
      </Transition>
    )
  }
}


const mapStateToProps = (state: any) => {
  return {
    isAuthModalOpen: state.uiReducer.isAuthModalOpen,
    isConfirmModalOpen: state.uiReducer.isConfirmModalOpen,
  }
}

export default connect(mapStateToProps, {
  openAuthModal,
  makeSignUpGlobal,
  openConfirmModal,
  setAuthModalUI
})(PassRquest)
