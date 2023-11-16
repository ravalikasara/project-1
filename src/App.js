import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/login'

import Home from './components/Home'

import NotFound from './components/NotFound'

import MyProfile from './components/MyProfile'

import UserProfile from './components/UserProfile'

import InstaContext from './Context/InstaContext'

import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

class App extends Component {
  state = {searchStatus: false, searchInput: ''}

  onSearchClick = value => {
    this.setState({searchStatus: true, searchInput: value})
  }

  render() {
    const {searchInput, searchStatus} = this.state

    return (
      <InstaContext.Provider
        value={{searchStatus, searchInput, onSearchClick: this.onSearchClick}}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />

          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <ProtectedRoute exact path="/users/:id" component={UserProfile} />

          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </InstaContext.Provider>
    )
  }
}
export default App
