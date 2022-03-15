import MiniMenu from '../components/mini-menu/MiniMenu.jsx';
import MiniFooter from '../components/mini-footer/MiniFooter.jsx';
import Courses from '../components/courses/Courses.jsx';
import { useState, useEffect } from 'react';
import { RequestCourses } from '../apis/requests.js';
import { useHistory } from 'react-router-dom';

function Register() {

  const [courses, setCourses] = useState(undefined)
  const history = useHistory()

  useEffect(() => {
    RequestCourses(setCourses, history)
  }, [history])

  return (
    <div className='signupPage'>
        <MiniMenu />
        <Courses text={'Escolha o curso de sua preferência'} courses={courses}/>
        <MiniFooter message={'Para darmos o primeiro passo, é necessário escolher um curso.'} />
    </div>
  )
}

export default Register;