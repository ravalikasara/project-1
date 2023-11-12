import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Login from './components/login'

import Home from './components/Home'

<<<<<<< HEAD
import MyProfile from './components/MyProfile'

=======
>>>>>>> 547346ec7b1aa27688e5b0f8e986a7e54b4393a6
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
<<<<<<< HEAD
      <ProtectedRoute exact path="/my-profile" component={MyProfile} />
=======
>>>>>>> 547346ec7b1aa27688e5b0f8e986a7e54b4393a6
    </Switch>
  </BrowserRouter>
)

export default App
