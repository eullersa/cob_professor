import { windowTop } from "../../apis/requests"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

function LessonBottom({show, next, setShow, bar, clicked, setClicked, setSuccess, finished=false}) {

  const [one, setOne] = useState(true)

  const nextQuestion = () => {
    if(clicked === false) {
      if(show[1] === false) {
        bar(prev => (prev + 1))
      }    
      next(prev => (prev + 1))
      setShow([undefined, show[1]])
      windowTop()
      setClicked(true)
    }
  }

  useEffect(() => {
    if(finished && one) {
      setOne(false)
      setSuccess(true)
    }
  }, [one, finished, setSuccess])

  return (
    <div className={show[0] ? `lesson-bottom show` : `lesson-bottom`}>
        <div className="lesson-items" style={typeof show[1] === 'string' ? {justifyContent: "center"} : {} }>

          {typeof show[1] === 'boolean'
            ? (
              <>
                <div className={show[1] === true ? 'message' : 'message wrong'}>
                  {show[1] ? (<><span className='emoji'>🐰</span> Você arrasa!</>) : <><span className='emoji'>💢</span> Você errou!</>}
                </div>
                <div className={show[1] === true ? 'button' : 'button wrong'} style={{cursor: 'pointer'}} onClick={() => nextQuestion()}>
                  Continuar
                </div>              
              </>
            ) : (
              <>
                <Link to='/dashboard' className={'button center'} style={{textDecorationLine: 'none'}}>
                  Terminar lição
                </Link>              
              </>
            )
          }


        </div>
    </div>
  )
}

export default LessonBottom;