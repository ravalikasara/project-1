import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/login'

import Home from './components/Home'

import NotFound from './components/NotFound'

import MyProfile from './components/MyProfile'

import UserProfile from './components/UserProfile'

import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/my-profile" component={MyProfile} />
      <ProtectedRoute exact path="/users/:id" component={UserProfile} />

      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
