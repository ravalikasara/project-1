import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {FaSearch} from 'react-icons/fa'

import './index.css'

import InstaContext from '../../Context/InstaContext'

class Header extends Component {
  state = {searchInput: ''}

  onSearchChange = event => {
    this.setState({searchInput: event.target.value})
  }

  setLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {searchInput} = this.state

    return (
      <InstaContext.Consumer>
        {value => {
          const {onSearchClick} = value

          const onSearchPress = () => {
            onSearchClick(searchInput)
          }

          return (
            <>
              {' '}
              <div className="header-container">
                <div className="header-left-container">
                  <Link to="/" className="header-link">
                    <img
                      className="header-website-logo"
                      src="https://res.cloudinary.com/du6aueulp/image/upload/v1699595444/cwzkzvqhse6bwoxhkv3c.png"
                      alt="website logo"
                    />
                  </Link>
                  <Link to="/" className="header-link">
                    <h1 className="header-title">Insta Share</h1>
                  </Link>
                </div>
                <div className="header-right-container">
                  <div className="search-input-container ">
                    <input
                      className="search-input"
                      type="search"
                      value={searchInput}
                      placeholder="Search Caption"
                      onChange={this.onSearchChange}
                    />
                    <button
                      label="h"
                      testid="searchIcon"
                      className="header-search-button"
                      type="button"
                      onClick={onSearchPress}
                    >
                      <FaSearch />
                    </button>
                  </div>
                  <ul className="header-lists-card">
                    <Link className="header-link" to="/">
                      <li key="home" className="header-lists">
                        <h1 className="headers-home">Home</h1>
                      </li>
                    </Link>
                    <Link to="/my-profile">
                      <li key="profile" className="header-lists">
                        <h1 className="headers-profile">Profile</h1>
                      </li>
                    </Link>
                    <li key="logout" className="header-lists">
                      <button
                        onClick={this.setLogout}
                        type="button"
                        className="headers-logout"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )
        }}
      </InstaContext.Consumer>
    )
  }
}

export default withRouter(Header)
