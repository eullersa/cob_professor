import LessonBar from "../components/lesson/LessonBar";
import LessonBottom from "../components/lesson/LessonBottom";
import Logo from "../components/logo/LogoLess";
import { useState, useRef, useEffect } from "react";
import correct from '../audio/correct.wav';
import incorrect from '../audio/incorrect.wav';
import success from '../audio/success.wav';
import Coelhos from '../imgs/lesson/coelhos.png'
import { useParams, useHistory, Redirect } from "react-router-dom";
import { Authenticated } from "../apis/requests";
import YoutubeAnswer from "../components/questions/YoutubeAnswer";

function Lesson() {

  const { id } = useParams()
  const [questions, setQuestions] = useState([
    {
      type: "YoutubeAnswer",
      title: 'Transcreva o trecho do vídeo a seguir',
      placeholder: 'O que ele disse?',
      videoId: '2IsGrEThpD0',
      start: 1,
      end: 6,
      answer: `I've been waiting for this moment my entire life`
    },
    {
      type: "YoutubeAnswer",
      title: 'Transcreva o trecho do vídeo a seguir',
      placeholder: 'O que ele disse?',
      videoId: 'ORp3q1Oaezw',
      start: 1,
      end: 6,
      answer: `I've been waiting for this moment my entire life`
    },
    {
      type: "YoutubeAnswer",
      title: 'Transcreva o trecho do vídeo a seguir',
      placeholder: 'O que ele disse?',
      videoId: 'kP7k996K9Hk',
      start: 1,
      end: 6,
      answer: `I've been waiting for this moment my entire life`
    },
  ])
  const history = useHistory()
  const { token } = Authenticated()

  useEffect(() => {
  }, [token, id, history])


  const playCorrect = useRef(null)
  const playIncorrect = useRef(null)
  const playSuccess = useRef(null)
  const [answer, setAnswer] = useState(undefined)
  const [finished, setSuccess] = useState(undefined)

  const [show, setShow] = useState([undefined, undefined])
  const [next, setNext] = useState(0)
  const [bar, setBar] = useState(0)
  const [clicked, setClicked] = useState(false)
  const [stop, setStop] = useState(false)
  const [stopClicked, setStopClicked] = useState(false)

  if(answer === true) {
    playCorrect.current.currentTime = 0
    playCorrect.current.play()
    setAnswer(undefined)
  } else if (answer === false) {
    playIncorrect.current.currentTime = 0
    playIncorrect.current.play()
    setAnswer(undefined)
  }

  if(finished === true) {
    playSuccess.current.currentTime = 0
    playSuccess.current.play()
  }

  if(next === questions?.length && typeof show[1] === 'boolean' && stop === false) {
    setStop(true)
    setTimeout(() => {
      setShow([true, '/'])
    }, 1500)
  }

  if(clicked === true && stopClicked === false) {
    setStopClicked(true)
    setTimeout(() => {
      setClicked(false)
      setStopClicked(false)
    }, 1000)
  }

  return (
    <>
      {questions === false ? <Redirect to='/dashboard'/> : ''}
      <audio src={correct} ref={playCorrect}></audio>
      <audio src={incorrect} ref={playIncorrect}></audio>
      <audio src={success} ref={playSuccess}></audio>
      <div className="background"></div>
      <div id='lesson' style={next === questions?.length ? {padding: "0"} : {}}>

        {next === questions?.length ? (
          null
        )
          : <LessonBar totalQuestions={questions?.length} current={bar} />
        }
        <div className="questions">

          {questions && questions?.map((question, i) => {

            if(question.type === "YoutubeAnswer") {
              return (
                <YoutubeAnswer title={question.title} placeholder={question.placeholder} video={question.videoId} start={question.start} end={question.end} answer={question.answer} setAnswer={setAnswer} setShow={setShow} setBar={setBar} current={next} questions={questions} setQuestions={setQuestions} index={i} />
              )
            } else {
              return null
            }

          })[next]}


          {next === questions?.length ? (
            <>
              <div className='logo-congratulations'>
                <Logo />
              </div>
              <div className="congratulations">
                <div className="image" style={{backgroundImage: `url(${Coelhos})`}}></div>
                <div className="title">Você completou a lição!</div>
                <div className="description">Acaba de ganhar: <span className='points'>+{questions?.length}0</span> <span className='emoji'>🐰</span></div>
              </div>
            </>
          )
            : null
          }

        </div>
        {typeof show[1] === 'string' ? (
          <LessonBottom show={show} setSuccess={setSuccess} finished={true} />
        )
          : <LessonBottom show={show} next={setNext} setShow={setShow} bar={setBar} clicked={clicked} setClicked={setClicked} />
        }
      </div>
    </>
  )
}

export default Lesson;