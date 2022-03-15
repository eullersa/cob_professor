import { useState, useRef, useEffect } from "react";
import YouTube from 'react-youtube';
import LessonAnswer from "../lesson/LessonAnswer";

function YoutubeAnswer ({title, placeholder, video, start, end, answer, setAnswer, setShow, setBar, current, setQuestions, questions, index}) {
  let pause = -((start - end) * 1000)
  const [player, setPlayer] = useState(undefined);
  const [videoId, setVideo] = useState(undefined);
  const [disable, setDisable] = useState(false)
  const [className, setClass] = useState(undefined);
  const [inputValue, setInput] = useState('');
  const [answered, setAnswered] = useState(undefined)
  const focus = useRef(null)

  useEffect(() => {
    setDisable(false)
    setClass(undefined)
    setPlayer(undefined)
    setVideo(undefined)
    setAnswered(undefined)
    setInput('')
    setTimeout(() => {
      setVideo(video)
    })    
  }, [index, video])

  // Youtube

  const onReady = (event) => {
    setPlayer(event.target)
  }

  const onPlayVideo = () => {
    setDisable(true)
  }

  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const onPlayButton = () => {
    player.seekTo(start)
    player.playVideo()
    setDisable(true)
    setTimeout(() => {
        player.pauseVideo()
        setDisable(false)
    }, pause)
  }

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

  const handleSubmit = (e) => {
      e.preventDefault()
      verifyAnswer()
  }

    return (
        
    <>

      <div className="youtube" style={{width: '100%', maxWidth: '587px'}}>
            
        <div className="title">{title}</div>
        {videoId && 
        <>
        <YouTube videoId={videoId?.replace(',', '')} pla opts={{
          height: '330',
          width: '100%',
          playerVars: { 'fs': 0, 'disablekb': 1, 'controls': 0, "start": start, "end": end + 1 },
          videoId: videoId?.replace(',', '')
        }} onEnd={() => {
            focus?.current?.focus()
            setDisable(false)}} onReady={onReady} onPlay={onPlayVideo} onPause={() => {
            focus.current.focus()
        setDisable(false)}} />
        <div className={player === null ? "ytButton" : 'ytButton open'}>
          <button className="button" type="button" onClick={onPlayButton} disabled={disable}>
          <div className="ball">
            <div className="inner"></div>
            <div className="circle">
              <div className="bar right">
                <div className="progressCircle" style={{animationDuration: `${pause/2}ms`}}></div>
              </div>
              <div className="bar left">
                <div className="progressCircle" style={{animationDelay: `${pause/2}ms`, animationDuration: `${pause/2}ms`}}></div>
              </div>
            </div>
          </div>
            Replay
          </button>
        </div>
        <div className={player === null ? "writeAnswer" : 'writeAnswer open'}>
            <span style={{visibility: 'hidden'}}>{answer}</span>
            <form onSubmit={handleSubmit}>
              <div className="inputAnswer" >
                  <input type="text" onChange={handleInput} className={className} value={inputValue} ref={focus} disabled={className === 'correct' || className === 'wrong' || className === '' ? true : false} placeholder={placeholder}  />
              </div>
            </form>
        </div>
        </>
        }
        {
          inputValue.length > 0 && answered === undefined &&
          <LessonAnswer answer={answer} setAnswer={setAnswer} setClass={setClass} setShow={setShow} setQuestions={setQuestions} setBar={setBar} focus={focus} setAnswered={setAnswered} questions={questions} current={current} show="show" />
        }
      </div>

    </>

  )
}

export default YoutubeAnswer