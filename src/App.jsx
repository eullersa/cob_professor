import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from '../src/pages/Home.jsx'
import Signup from './pages/Login.jsx'
import Team from '../src/pages/Team.jsx'
import Prices from '../src/pages/Prices.jsx'
import Register from './pages/Register.jsx'
import ResetPassword from '../src/pages/ResetPassword.jsx'
import Dashboard from '../src/pages/Dashboard.jsx'
import Courses from '../src/pages/Courses.jsx'
import Modules from '../src/pages/Modules.jsx'
import Lessons from '../src/pages/Lessons.jsx'
import PrivateRoute from './auth/PrivateRoute.jsx'
import PasswordRecovery from './pages/PasswordRecovery.jsx'
import NoLogged from './auth/NoLogged.jsx'
import Topics from './pages/Topics.jsx'
import Lesson from './pages/Lesson.jsx'
import SiteCreator from './sitecreator/App'
import LessonTest from './pages/LessonTest.jsx'
import Live from './pages/Live.jsx'
import { GetDarkMode, toggleBulb } from './apis/requests.js'
import {useEffect} from 'react'
import Menu from './components/menu/Menu.jsx'
import Footer from './components/footer/Footer.jsx'
import Profile from './professor/profileLink/Profile.jsx'

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
          <NoLogged path='/register' exact component={Register} />
          <NoLogged path='/reset' exact component={ResetPassword} />
          <NoLogged path='/teacher/password/reset/:id' exact component={PasswordRecovery} />
          <Route path='/equipe' exact component={Team} />
          <Route path='/site/preview/:id' exact component={() => (<SiteCreator disable={false} />)} />
          <PrivateRoute path='/precos' exact component={Prices} />
          <PrivateRoute path='/live' exact component={Live} />
          <PrivateRoute path='/test' exact component={LessonTest} />
          <PrivateRoute path='/lesson/:id' exact component={Lesson} />
          <PrivateRoute path='/modulos' exact component={Topics} />
          <PrivateRoute path='/creator/site/:id' exact component={() => (<SiteCreator disable={true} />)} />
          <>
          <Menu items={[
            {name: 'sites', link: '/dashboard'},
            {name: 'alunos', link: '/dashboard'},
            {name: 'faturas', link: '/dashboard'},
          ]} courses={false} links={[
            {name: 'conta', link: '/profile', type: 'button', function: 'signout'},
            {name: 'sair', link: '', type: 'text', onclick: 'signout'}
          ]} longer={'longer'} />
          <div className='spaceContent'></div>
          <PrivateRoute path='/dashboard' exact component={Dashboard} />
          <PrivateRoute path='/site/:id' exact component={Courses} />
          <PrivateRoute path='/course/:id' exact component={Modules} />
          <PrivateRoute path='/module/:id' exact component={Lessons} />
          <PrivateRoute path='/profile' exact>
              <Profile />
          </PrivateRoute>
          <Footer over={false} />
          </>
        </Switch>
    </Router>
  )
}

export default App;
