import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'

import {BsHeart} from 'react-icons/bs'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'

import InstaContext from '../../Context/InstaContext'

import './index.css'

class SearchResult extends Component {
  state = {
    posts: [],

    resultStatus: 'INITIAL',
  }

  componentDidMount() {
    const {searchInput} = this.context
    this.getSearchResult(searchInput)
  }

  getSearchResult = async input => {
    this.setState({
      resultStatus: 'LOADING',
    })
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${input}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const rawData = await response.json()

    if (response.ok) {
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
      this.setState({posts, resultStatus: 'SUCCESS'})
    } else {
      this.setState({resultStatus: 'FAILURE'})
    }
  }

  renderLoadingSearchResults = () => (
    <div data-test-id="Loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderSearchResultFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/du6aueulp/image/upload/v1699689961/tgr3k1fh3luixvqn37n4.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-text">Something went wrong. Please try again</h1>
      <button type="button" onClick={this.getStories} className="retry-button">
        Try Again
      </button>
    </div>
  )

  onSearchLike = (pid, likeStatus) => {
    const {posts} = this.state
    const newData = posts.map(each => {
      if (each.postId === pid) {
        if (likeStatus) {
          return {
            comments: each.comments,
            createdAt: each.createdAt,
            likesCount: each.likesCount - 1,
            postDetails: each.postDetails,
            postId: each.postId,
            profilePic: each.profilePic,
            userId: each.userId,
            username: each.username,
            isLiked: false,
          }
        }
        return {
          comments: each.comments,
          createdAt: each.createdAt,
          likesCount: each.likesCount + 1,
          postDetails: each.postDetails,
          postId: each.postId,
          profilePic: each.profilePic,
          userId: each.userId,
          username: each.username,
          isLiked: true,
        }
      }
      return each
    })
    this.setState({posts: newData})
    this.setSearchLikeStatus(pid, likeStatus)
  }

  setSearchLikeStatus = async (pid, isLiked) => {
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

  noSearchResultview = () => (
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

  renderSearchResultPostSuccessView = () => {
    const {posts} = this.state
    return posts.length > 0 ? (
      <div>
        {posts.map(each => {
          const {postDetails, comments} = each

          return (
            <div className="post-container" key={each.postId}>
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
                    onClick={() => this.onSearchLike(each.postId, each.isLiked)}
                    aria-label="Search"
                    type="button"
                    className="icons-button"
                  >
                    <FcLike />
                  </button>
                ) : (
                  <button
                    onClick={() => this.onSearchLike(each.postId, each.isLiked)}
                    aria-label="Search"
                    type="button"
                    data-test-id="likeIcon"
                    className="icons-button"
                  >
                    <BsHeart />{' '}
                  </button>
                )}

                <button
                  aria-label="Search"
                  type="button"
                  data-test-id="unLikeIcon"
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
            </div>
          )
        })}
      </div>
    ) : (
      this.noSearchResultview()
    )
  }

  renderSearchResultPost = () => {
    const {resultStatus} = this.state

    switch (resultStatus) {
      case 'LOADING':
        return this.renderLoadingSearchResults()
      case 'SUCCESS':
        return this.renderSearchResultPostSuccessView()
      case 'FAILURE':
        return this.renderSearchResultFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <InstaContext.Consumer>
        {value => (
          <div className="home-container">
            <div className="posts-container">
              {this.renderSearchResultPost()}
            </div>
          </div>
        )}
      </InstaContext.Consumer>
    )
  }
}

SearchResult.contextType = InstaContext

export default SearchResult
