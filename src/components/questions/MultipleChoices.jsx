import { useState } from "react";

function MultipleChoice({title, description, choices, answer, show, setQuestions, questions, current, bar, setAnswer}) {

  const [select, setSelect] = useState([undefined, undefined])
  const [clicked, setClicked] = useState(false)
  const clicking = (i, answer) => {
    if(clicked === false) {
        if(i === answer) {
            setSelect([i, 'correct'])
            bar(prev => (prev + 1))
            setAnswer(true)
        } else {
            setSelect([i, 'wrong'])
            setQuestions(prev => ([...prev, questions[current]]))
            setAnswer(false)
        }
        setClicked(true)
        if(answer === i) {
            show([true, true])
        } else {
            show([true, false])
        }
    } else {
        return null
    }
  }

  return (
    <div className="multipleChoice">
        <div className="title">{title}</div>
        {description && <div className="description">{description}</div>}        
        <div className="choices">
            {choices && choices.map((choice, i) => (
                <div className={select[0] === i ? `choice ${select[1]}` : 'choice'} key={i} onClick={() => clicking(i, answer)}>
                    <div className="ball"></div>
                    {choice}
                </div>
            ))}
        </div>
    </div>
  )
}

export default MultipleChoice;