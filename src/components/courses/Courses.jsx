import { Fragment, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import { Authenticated, noNew, signout } from '../../apis/requests';

function Courses({text, button, message, image, description, courses}) {

  const [nonew, setNoNew] = useState(true)
  const { token } = Authenticated()
  const history = useHistory()
  const handleClick = () => {
    history.push("/");
  }
  
  const redirectPage = (validation) => {
    if(validation === false) {
      return (<Redirect to='/dashboard'/>)
    } else {
      return null
    }
  }

  const selectCourse = (id) => {
    noNew(setNoNew, id, token)
  }

  return (
    <Fragment>
      <div className="close" onClick={() => signout(handleClick)} style={{cursor: 'pointer', position: 'fixed', top: 45, left: 50, color: 'white', fontWeight: 700, fontSize: '23px'}}><i class="fas fa-times"></i></div>
      <div id='courses'>
        {redirectPage(nonew)}
        <span className='text'>{text}</span>
        <div className='cards'>
          {courses?.map((course, id) => {
            return(
              <div className="card" key={id}>
                <div className="card-body">
                    <p className="card-title">{course.name}</p>
                    <p className="card-text">{course.description}</p>
                    <div style={{width: '100%', height: '80px', backgroundRepeat: 'no-repeat', backgroundImage: `url('${course.image}')`, backgroundPosition: 'center', marginBottom: '12px', backgroundSize: 'contain'}}>
                    </div>
                    <button type="submit" onClick={() => selectCourse(course._id)} className="btn btn-form">Escolher curso</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Fragment>
  );
}

export default Courses;