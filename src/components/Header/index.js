import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import './index.css'

const Header = props => {
  const setLogout = () => {
    const {history} = props
    const jwtToken = Cookies.get('jwt_token')

    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="header-container">
      <div className="header-left-container">
        <img
          className="header-website-logo"
          src="https://res.cloudinary.com/du6aueulp/image/upload/v1699595444/cwzkzvqhse6bwoxhkv3c.png"
          alt="website logo"
        />
        <Link to="/" className="header-link">
          <h1 className="header-title">Insta Share</h1>
        </Link>
      </div>
      <div className="header-right-container">
        <div className="search-input-container ">
          <input
            className="search-input"
            type="search"
            placeholder="Search Caption"
          />
          <button label="h" className="header-search-button" type="button">
            <BsSearch />
          </button>
        </div>
        <ul className="header-lists-card">
          <Link className="header-link" to="/">
            <li className="header-lists">
              <h1 className="headers-home">Home</h1>
            </li>
          </Link>
          <Link className="header-link" to="/my-profile">
            <li className="header-lists">
              <h1 className="headers-profile">Profile</h1>
            </li>
          </Link>
          <li className="header-lists">
            <button
              onClick={setLogout}
              type="button"
              className="headers-logout"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default withRouter(Header)
