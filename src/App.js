import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Login from './components/login'

import Home from './components/Home'

import MyProfile from './components/MyProfile'

import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/my-profile" component={MyProfile} />
    </Switch>
  </BrowserRouter>
)

export default App
