import {Component} from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/login'

import Home from './components/Home'

import NotFound from './components/NotFound'

import UserProfile from './components/UserProfile'

import ProtectedRoute from './components/ProtectedRoute'
import InstaContext from './Context/InstaContext'

import './App.css'

class App extends Component {
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
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />

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
