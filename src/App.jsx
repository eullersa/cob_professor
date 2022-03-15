import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from '../src/pages/Home.jsx'
import Signup from './pages/Login.jsx'
import Team from '../src/pages/Team.jsx'
import Prices from '../src/pages/Prices.jsx'
import Register from './pages/Register.jsx'
import ResetPassword from '../src/pages/ResetPassword.jsx'
import Dashboard from '../src/pages/Dashboard.jsx'
import PrivateRoute from './auth/PrivateRoute.jsx'
import NoLogged from './auth/NoLogged.jsx'
import Topics from './pages/Topics.jsx'
import Lesson from './pages/Lesson.jsx'
import LessonTest from './pages/LessonTest.jsx'
import Live from './pages/Live.jsx'
import { GetDarkMode, toggleBulb } from './apis/requests.js'
import {useEffect} from 'react'

function App() {

  useEffect(() => {
    if(GetDarkMode() === true) {
      toggleBulb(undefined, true)
    }
  }, [])

  return (
    <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <NoLogged path='/login' exact component={Signup} />
          <NoLogged path='/teacher/login' exact component={Signup} />
          <NoLogged path='/register' exact component={Register} />
          <NoLogged path='/reset' exact component={ResetPassword} />
          <Route path='/equipe' exact component={Team} />
          <PrivateRoute path='/precos' exact component={Prices} />
          <PrivateRoute path='/lesson/:id' exact component={Lesson} />
          <PrivateRoute path='/test' exact component={LessonTest} />
          <PrivateRoute path='/dashboard' exact component={Dashboard} />
          <PrivateRoute path='/modulos' exact component={Topics} />
          <PrivateRoute path='/live' exact component={Live} />
        </Switch>
    </Router>
  )
}

export default App;
