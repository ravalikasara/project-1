import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

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
  }

  renderProfileLoading = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
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
      <>
        <Header />
        <div className="profile-container">{this.renderProfile()}</div>
      </>
    )
  }
}

export default MyProfile
