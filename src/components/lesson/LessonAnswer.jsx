import { useEffect, useState } from "react";

function LessonAnswer({show = '', answer, setAnswer, setClass, setShow, setQuestions, setBar, focus, setAnswered, questions, current}) {

  const func = () => {
    focus.current?.removeEventListener('animationend', func)
  }

  const verifyAnswer = () => {
    if(answer.toLowerCase().replace(`'`, '').replace(`,`, '').replace(`.`, '') === focus?.current?.value.toLowerCase().replace(`'`, '').replace(`,`, '').replace(`.`, '')) {
        setAnswer(true)
        setClass('correct')
        setShow([true, true])
        setBar(prev => (prev + 1))
    } else {
        setAnswer(false)
        setClass('wrong')
        setShow([true, false])
        setQuestions(prev => ([...prev, questions[current]]))
        focus.current?.addEventListener('animationend', func)
    }
    setAnswered(true)
  }

  const [showAsk, setShowAsk] = useState('')

  useEffect(() => {
    setShowAsk('')
    setTimeout(() => {
      setShowAsk(show)
    })
  }, [show])

  return (
    <div className={`lesson-answer ${showAsk}`}>
        <div className="lesson-items">

          {(
              <>
                <div className={'button'} onClick={verifyAnswer} style={{cursor: 'pointer'}}>
                  Confirmar
                </div>              
              </>
          )}


        </div>
    </div>
  )
}

export default LessonAnswer;