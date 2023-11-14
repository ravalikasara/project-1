<<<<<<< HEAD
import {Component} from 'react'
=======
>>>>>>> 1d05b631f96fbf0a0be79cfd4d1a54966c87eb47
import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

<<<<<<< HEAD
import {FaSearch} from 'react-icons/fa'

import './index.css'

class Header extends Component {
  state = {searchInput: '', searchResult: [], displaySearchResult: false}

  componentDidMount = () => {
    this.getSearchResults()
  }

  setLogout = () => {
    const {history} = this.props
=======
import {BsSearch} from 'react-icons/bs'

import './index.css'

const Header = props => {
  const setLogout = () => {
    const {history} = props
    const jwtToken = Cookies.get('jwt_token')
>>>>>>> 1d05b631f96fbf0a0be79cfd4d1a54966c87eb47

    Cookies.remove('jwt_token')
    history.replace('/login')
  }
<<<<<<< HEAD

  onSearchChange = event => {
    this.setState({searchInput: event.target.value})
    this.getSearchResults()
  }

  renderNoSearch = () => (
    <div className="search-container">
      <img
        src="https://res.cloudinary.com/du6aueulp/image/upload/v1699950516/xjjuhai0w1dsw8nh8eho.png"
        alt="search not found"
        className="search-not-found-img"
      />
      <h1 className="search-not-found">Search Not Found</h1>
      <p className="search-not-found-desc">
        Try different keyword or search again
      </p>
    </div>
  )

  renderSearchPosts = () => {
    const {searchResult} = this.state
    return <div>hi</div>
  }

  renderSearchResults = () => {
    const {searchResult} = this.state

    if (searchResult.length === 0) {
      return this.renderNoSearch()
    }

    return this.renderSearchPosts()
  }

  getSearchResults = async () => {
    const {searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')

    const ApiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(ApiUrl, options)
    const data = await response.json()
    const rawPosts = data.posts
    const searchResult = rawPosts.map(each => ({
      comments: each.comments,
      createdAt: each.created_at,
      likesCount: each.likes_count,
      postDetails: each.post_details,
      postId: each.post_id,
      profilePic: each.profile_pic,
      userId: each.user_id,
      username: each.user_name,
      isLiked: false,
    }))
    this.setState({searchResult})
  }

  onSearch = () => {
    this.setState(prev => ({displaySearchResult: !prev.displaySearchResult}))
  }

  render() {
    const {searchInput, searchResult, displaySearchResult} = this.state

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
                data-testid="searchIcon"
                className="header-search-button"
                type="button"
                onClick={this.onSearch}
              >
                <FaSearch />
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
        {displaySearchResult && this.renderSearchResults()}
      </>
    )
  }
=======
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
>>>>>>> 1d05b631f96fbf0a0be79cfd4d1a54966c87eb47
}

export default withRouter(Header)
