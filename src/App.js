import {Component} from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/login'

import Home from './components/Home'

import NotFound from './components/NotFound'

<<<<<<< HEAD
import MyProfile from './components/MyProfile'

import UserProfile from './components/UserProfile'

import InstaContext from './Context/InstaContext'

import ProtectedRoute from './components/ProtectedRoute'
=======
import UserProfile from './components/UserProfile'

import ProtectedRoute from './components/ProtectedRoute'
import InstaContext from './Context/InstaContext'
>>>>>>> a57c6911bf2ed7bfa94a577fff9c1d3dc85b839c

import './App.css'

class App extends Component {
<<<<<<< HEAD
  state = {searchStatus: false, searchInput: ''}

  onSearchClick = value => {
    this.setState({searchStatus: true, searchInput: value})
  }

  render() {
    const {searchInput, searchStatus} = this.state

    return (
      <BrowserRouter>
        <InstaContext.Provider
          value={{searchStatus, searchInput, onSearchClick: this.onSearchClick}}
=======
  state = {SearchResultList: [], text: ''}
  onChangeSearchInput = text => {
    console.log(text)
  }

  render() {
    const {SearchResultList} = this.state
    return (
      <BrowserRouter>
        <InstaContext.Provider
          value={{
            SearchResultList,

            SearchStatus: false,
            onChangeSearchInput: this.onChangeSearchInput,
          }}
>>>>>>> a57c6911bf2ed7bfa94a577fff9c1d3dc85b839c
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />

<<<<<<< HEAD
            <ProtectedRoute exact path="/my-profile" component={MyProfile} />
=======
>>>>>>> a57c6911bf2ed7bfa94a577fff9c1d3dc85b839c
            <ProtectedRoute exact path="/users/:id" component={UserProfile} />

            <Route exact path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </InstaContext.Provider>
      </BrowserRouter>
    )
  }
}
export default App
