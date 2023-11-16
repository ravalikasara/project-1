import {Component} from 'react'

import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import SearchResult from '../SearchResult'

import InstaContext from '../../Context/InstaContext'

import './index.css'

class MyProfile extends Component {
  state = {status: 'INITIAL', profileData: {}}

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({status: 'LOADING'})
    const jwtToken = Cookies.get('jwt_token')

    const ApiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(ApiUrl, options)
    const data = await response.json()

    if (response.ok) {
      const rawProfileData = data.profile
      const profileData = {
        followersCount: rawProfileData.followers_count,
        followingCount: rawProfileData.following_count,
        id: rawProfileData.id,
        posts: rawProfileData.posts,
        postsCount: rawProfileData.posts_count,
        profilePic: rawProfileData.profile_pic,
        stories: rawProfileData.stories,
        userBio: rawProfileData.user_bio,
        userId: rawProfileData.user_id,
        username: rawProfileData.user_name,
      }

      this.setState({profileData, status: 'SUCCESS'})
    } else {
      this.setState({status: 'FAILURE'})
    }
  }

  renderProfileLoading = () => (
    <div testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderPostView = () => {
    const {profileData} = this.state
    const {posts} = profileData

    return (
      <ul className="profile-post-card">
        {posts.map(each => (
          <li className="post-list" key={each.id}>
            <img src={each.image} alt="my post" className="post-image" />
          </li>
        ))}
      </ul>
    )
  }

  noPostsView = () => (
    <>
      <BiCamera />
      <h1>No Posts Yet</h1>
    </>
  )

  renderProfileSuccessView = () => {
    const {profileData} = this.state
    const {postsCount} = profileData

    return (
      <div className="profile-success-container">
        <div className="profile-details-container">
          <img
            src={profileData.profilePic}
            alt="my profile"
            className="profile-image"
          />
          <div>
            <h1 className="profile-name">{profileData.username}</h1>
            <div className="profile-following-card">
              <p className="profile-post-count">
                {profileData.postsCount} posts
              </p>
              <p className="profile-post-count">
                {profileData.followersCount} followers
              </p>
              <p className="profile-post-count">
                {profileData.followingCount} following
              </p>
            </div>
            <h1 className="profile-post-count">{profileData.userId}</h1>
            <h1 className="profile-post-bio">{profileData.userBio}</h1>
          </div>
        </div>

        <ul className="profile-stories-card">
          {profileData.stories.map(each => (
            <li key={each.id} className="profile-story">
              <img
                src={each.image}
                alt="my story"
                className="profile-story-img"
              />
            </li>
          ))}
        </ul>
        <hr className="profile-hr-line" />
        <div className="posts-top-card">
          <div>
            <BsGrid3X3 className="posts-grid" />
          </div>
          <h1 className="posts-top-post">Posts</h1>

          {postsCount > 0 && this.renderPostView()}

          {this.noPostsView()}
        </div>
      </div>
    )
  }

  renderProfileFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/du6aueulp/image/upload/v1699689961/tgr3k1fh3luixvqn37n4.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button type="button" onClick={this.getProfileData}>
        Try Again
      </button>
    </div>
  )

  renderProfile = () => {
    const {status} = this.state

    switch (status) {
      case 'LOADING':
        return this.renderProfileLoading()
      case 'FAILURE':
        return this.renderProfileFailureView()
      case 'SUCCESS':
        return this.renderProfileSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <InstaContext.Consumer>
        {value => {
          const {searchStatus} = value
          return (
            <>
              <Header />
              {searchStatus ? (
                <SearchResult />
              ) : (
                <div className="profile-container">{this.renderProfile()}</div>
              )}
            </>
          )
        }}
      </InstaContext.Consumer>
    )
  }
}

export default MyProfile
