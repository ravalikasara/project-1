import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/login'

import Home from './components/Home'

<<<<<<< HEAD
import NotFound from './components/NotFound'

import MyProfile from './components/MyProfile'

import UserProfile from './components/UserProfile'

=======
<<<<<<< HEAD
import MyProfile from './components/MyProfile'

=======
>>>>>>> 547346ec7b1aa27688e5b0f8e986a7e54b4393a6
>>>>>>> 1d05b631f96fbf0a0be79cfd4d1a54966c87eb47
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
<<<<<<< HEAD
      <ProtectedRoute exact path="/my-profile" component={MyProfile} />
      <ProtectedRoute exact path="/users/:id" component={UserProfile} />

      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
=======
<<<<<<< HEAD
      <ProtectedRoute exact path="/my-profile" component={MyProfile} />
=======
>>>>>>> 547346ec7b1aa27688e5b0f8e986a7e54b4393a6
>>>>>>> 1d05b631f96fbf0a0be79cfd4d1a54966c87eb47
    </Switch>
  </BrowserRouter>
)

export default App
