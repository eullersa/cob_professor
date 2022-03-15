import Logo from "../../components/logo/LogoLess";
import { Link } from "react-router-dom";

function LessonBar({totalQuestions, current}) {

  return (
    <>
      <div className="lesson-bar">
        <div className="lesson-items">
            <div className="logo">
            <Logo />
            </div>
            <div className="bar">
              <div className="lesson-progress">
                <div className="progressing" style={totalQuestions ? {width: `calc(100% * (${current} / ${totalQuestions}))`, transition: "0.25s ease width"} : {width: 0}}></div>
              </div>
              <div className="count">{current} {totalQuestions ? <span>/</span>: <span></span>} {totalQuestions}</div>
            </div>
            <Link to='/dashboard'><i className="fas fa-times"></i></Link>
        </div>
      </div>
      <div className="menu-bar"></div>
    </>
  )
}

export default LessonBar;