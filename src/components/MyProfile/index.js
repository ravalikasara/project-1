import {Component} from 'react'

import {BsGrid3X3} from 'react-icons/bs'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import SearchResult from '../SearchResult'

import InstaContext from '../../Context/InstaContext'

import './index.css'

class MyProfile extends Component {
  state = {status: 'INITIAL', profileData: []}

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
    <div className="profile-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderNoPostsView = () => (
    <div className="profile-no-posts">
      <img
        src="https://res.cloudinary.com/du6aueulp/image/upload/v1699935379/uve9qurerje4wxpjaly0.png"
        alt="no posts"
        className="no-post-image"
      />
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

  renderProfileSuccessView = () => {
    const {profileData} = this.state

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
              <h1 className="profile-post-count">
                {profileData.postsCount} posts
              </h1>
              <h1 className="profile-post-count">
                {profileData.followersCount} followers
              </h1>
              <h1 className="profile-post-count">
                {profileData.followingCount} following
              </h1>
            </div>
            <h1 className="profile-post-count">{profileData.username}</h1>
            <p className="profile-post-bio">{profileData.userBio}</p>
          </div>
        </div>

        <ul className="profile-stories-card">
          {profileData.stories.map(each => (
            <li key={each.userId} className="profile-story">
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
        </div>

        {profileData.postsCount > 0
          ? this.renderPostView()
          : this.renderNoPostsView()}
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
      <h1 className="failure-text">Something went wrong. Please try again</h1>
      <button
        type="button"
        onClick={this.getProfileData}
        className="retry-button"
      >
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
