import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'

import {BsHeart} from 'react-icons/bs'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'

import Slider from 'react-slick'

import Header from '../Header'
import SearchResult from '../SearchResult'
import InstaContext from '../../Context/InstaContext'

import './index.css'

class Home extends Component {
  state = {
    stories: [],
    posts: [],

    status: 'INITIAL',
    postStatus: 'INITIAL',
  }

  componentDidMount() {
    this.getStories()
    this.getPost()
  }

  getStories = async () => {
    this.setState({
      status: 'LOADING',
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/insta-share/stories`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const usersData = fetchedData.users_stories
      const data = usersData.map(each => ({
        userId: each.user_id,
        username: each.user_name,
        storyUrl: each.story_url,
      }))

      this.setState({status: 'SUCCESS', stories: data})
    } else {
      this.setState({status: 'FAILURE'})
    }
  }

  getPost = async () => {
    this.setState({
      postStatus: 'LOADING',
    })
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/insta-share/posts`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const rawData = await response.json()
      const rawPosts = rawData.posts
      const posts = rawPosts.map(each => ({
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
      this.setState({posts, postStatus: 'SUCCESS'})
    } else {
      this.setState({postStatus: 'FAILURE'})
    }
  }

  renderLoadingForStories = () => (
    <div testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderLoadingForPosts = () => (
    <div testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/du6aueulp/image/upload/v1699689961/tgr3k1fh3luixvqn37n4.png"
        alt="failure view"
      />
      <h1>Something went wrong. Please try again</h1>
      <button type="button" onClick={this.getStories}>
        Try Again
      </button>
    </div>
  )

  renderStorySuccessView = () => {
    const {stories} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
    }

    return (
      <div className="main-container">
        <ul className="slick-container">
          {' '}
          <Slider {...settings}>
            {stories.map(eachLogo => {
              const {userId, storyUrl, username} = eachLogo
              return (
                <li className="slick-item" key={userId}>
                  <img className="logo-image" src={storyUrl} alt="user story" />
                  <p className="home-story-name">{username}</p>
                </li>
              )
            })}
          </Slider>
        </ul>
      </div>
    )
  }

  renderStories = () => {
    const {status} = this.state

    switch (status) {
      case 'LOADING':
        return this.renderLoadingForStories()
      case 'SUCCESS':
        return this.renderStorySuccessView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderPostFailureView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/du6aueulp/image/upload/v1699689973/pesho6ybcplhphvnquxk.png"
        alt="failure view"
      />
      <h1> Something went wrong. Please try again</h1>
      <button type="button" onClick={this.getPost}>
        Try Again
      </button>
    </div>
  )

  onLike = (pid, likeStatus) => {
    const {posts} = this.state
    const newData = posts.map(each => {
      if (each.postId === pid) {
        return {
          comments: each.comments,
          createdAt: each.createdAt,
          likesCount: likeStatus ? each.likesCount - 1 : each.likesCount + 1,
          postDetails: each.postDetails,
          postId: each.postId,
          profilePic: each.profilePic,
          userId: each.userId,
          username: each.username,
          isLiked: !likeStatus,
        }
      }

      return each
    })
    this.setState({posts: newData})
    this.setLikeStatus(pid, likeStatus)
  }

  setLikeStatus = async (pid, isLiked) => {
    const url = `https://apis.ccbp.in/insta-share/posts/${pid}/like`
    const jwtToken = Cookies.get('jwt_token')
    const userDetails = {like_status: !isLiked}

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
  }

  renderPostSuccessView = () => {
    const {posts} = this.state
    return (
      <ul>
        {posts.map(each => {
          const {postDetails, comments} = each

          return (
            <li className="post-container" key={each.postId}>
              <div className="post-profile-card">
                <img
                  className="post-profile-img"
                  src={each.profilePic}
                  alt="post author profile"
                />
                <Link className="link-profile" to={`/users/${each.userId}`}>
                  <p className="name">{each.username}</p>
                </Link>
              </div>
              <img
                className="post-img"
                src={postDetails.image_url}
                alt="post"
              />
              <div className="post-profile-card">
                {each.isLiked ? (
                  <button
                    onClick={() => this.onLike(each.postId, each.likeStatus)}
                    label="l"
                    type="button"
                    testid="unLikeIcon"
                    className="icons-button"
                  >
                    <FcLike />
                  </button>
                ) : (
                  <button
                    label="m"
                    onClick={() => this.onLike(each.postId, each.likeStatus)}
                    type="button"
                    testid="likeIcon"
                    className="icons-button"
                  >
                    <BsHeart />
                  </button>
                )}

                <button
                  aria-label="Search"
                  type="button"
                  className="icons-button"
                >
                  <FaRegComment />
                </button>
                <button
                  aria-label="Search"
                  type="button"
                  className="icons-button"
                >
                  <BiShareAlt />
                </button>
              </div>
              <p className="likes-count">{each.likesCount} likes</p>
              <p className="post-caption">{postDetails.caption}</p>
              <p className="comment">
                <span className="username">{comments[0].user_name}</span>
                {comments[0].comment}
              </p>
              <p className="comment">
                <span className="username">{comments[1].user_name}</span>
                {comments[1].comment}
              </p>
              <p className="date">{each.createdAt}</p>
            </li>
          )
        })}
      </ul>
    )
  }

  renderPost = () => {
    const {postStatus} = this.state

    switch (postStatus) {
      case 'LOADING':
        return this.renderLoadingForPosts()
      case 'SUCCESS':
        return this.renderPostSuccessView()
      case 'FAILURE':
        return this.renderPostFailureView()
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
                <div className="home-container">
                  <div className="story-container">{this.renderStories()}</div>
                  <div className="posts-container">{this.renderPost()}</div>
                </div>
              )}
            </>
          )
        }}
      </InstaContext.Consumer>
    )
  }
}

export default Home
