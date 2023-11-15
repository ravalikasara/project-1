import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onformSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onusernameChange = event => {
    this.setState({username: event.target.value})
  }

  onpasswordChange = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-container">
        <div className="login-card-container">
          <img
            alt="website login"
            className="login-page-image"
            src="https://res.cloudinary.com/du6aueulp/image/upload/v1699595893/z6j1ajzrllbhxrxxpuuv.png"
          />
          <div className="login-form-card">
            <img
              className="login-page-website-logo"
              src="https://res.cloudinary.com/du6aueulp/image/upload/v1699595444/cwzkzvqhse6bwoxhkv3c.png"
              alt="website logo"
            />
            <h1 className="login-heading">Insta Share</h1>
            <form onSubmit={this.onformSubmit} className="form-card">
              <div className="form-label-div">
                <label className="login-form-label" htmlFor="username">
                  USERNAME
                </label>
                <input
                  onChange={this.onusernameChange}
                  value={username}
                  className="login-form-input"
                  type="text"
                  id="username"
                />
              </div>
              <div className="form-label-div">
                <label className="login-form-label" htmlFor="password">
                  PASSWORD
                </label>
                <input
                  onChange={this.onpasswordChange}
                  value={password}
                  className="login-form-input"
                  type="password"
                  id="password"
                />
                {showSubmitError ? (
                  <p className="errorMsg">{errorMsg}</p>
                ) : null}
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
