import { Link } from "react-router-dom"

function LessonToDashboard({dashboard = false}) {

  return (
    <div className={dashboard ? `lesson-bottom show` : `lesson-bottom`}>
        <div className="lesson-items">
          <div className={'message'}>
            {""}
          </div>
          <Link to='/dashboard' className={'button'} style={{textDecorationLine: 'none'}}>
            Continuar
          </Link>
        </div>
    </div>
  )
}

export default LessonToDashboard;