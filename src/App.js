import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Login from './components/login'

import Home from './components/Home'

import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
    </Switch>
  </BrowserRouter>
)

export default App
