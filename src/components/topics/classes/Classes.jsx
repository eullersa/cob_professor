import { Fragment, useState, useEffect } from "react";
import { Link, Redirect, useHistory } from 'react-router-dom'
import Chave from "../../../imgs/dashboard/chave.png";
import { RequestModules, Authenticated, CurrentModule, UpdateModule, UpdateLesson } from '../../../apis/requests'

function Classes({setCoursesDrop}) {


    // Get all modules and lessons

    const [modules, setModules] = useState(undefined)
    const [current, setCurrent] = useState(undefined)
    const [subscription, setSubscription] = useState(undefined)
    const { token } = Authenticated()
    const history = useHistory()

    useEffect(() => {
        RequestModules(setModules, token)
        CurrentModule(setCurrent, token, () => ([]), setSubscription, setCoursesDrop, history)
    }, [token, setCoursesDrop, history])

    // redirect

    // Open all lesson from a module
    const [open, setOpen] = useState(undefined)

    const redirectPage = (validation) => {
        if(validation === true) {
          return (<Redirect to='/courses'/>)
        } else {
          return null
        }
    }

    const updateLesson = (lessonId, moduleId, lessonNumber) => {
        UpdateLesson(setCurrent, token, lessonId, current, lessonNumber, moduleId)
    }

    const updateModule = (id) => {
        UpdateModule(setCurrent, token, id)
    }

    const handleClick = (topic) => {
        if(topic === open) {
            setOpen(false)
        } else {
            setOpen(topic)
            console.log(topic)
        }
    }

    const mapDivs = () => {
        if (modules !== true)
        return modules?.map((module, indexT) => {
        return (
            <Fragment key={indexT}>
            <div key={indexT} className={module.success === true ? "classItem topic complete" : "classItem topic"}>
                <div className="progressVertical">
                    <div className="ball"></div>
                    <div className="line"></div>
                </div>
                <div className="class">
                    <div className="image" style={{backgroundImage: `url(${module.image})`}}></div>
                    <div className="text">
                        <div className="next">{module.topic}</div>
                        <div className="title">{module.name}</div>
                        <div className="description">{module.description}</div>
                    </div>

                    {module._id === current?.current?._id ? (
                        <div className="progressBar">
                            <div className="bar">
                                <div className="button">
                                    <div className="button-text">
                                        <div className="dropdown choose" onClick={() => handleClick(indexT)}>lições <i className="fas fa-caret-down"></i></div>
                                    </div>
                                </div>
                                <div className="line-bar">
                                    <div className="line-complete" style={{width: `${module.percentage}px`}}></div>
                                </div>
                                <span className='conclusion'>{module.percentage}% concluído</span>
                            </div>
                        </div>
                    ) : (
                        <div className="button">
                            <div className="button-text">
                                <button className="button-form" onClick={() => updateModule(module._id)}>Escolher</button>
                                <div className="dropdown" onClick={() => handleClick(indexT)}>lições <i className="fas fa-caret-down"></i></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {module.lessons.map((lesson, indexL) => {

                if(indexT === open) {
                    return (
                        <div key={indexL} onClick={() => updateLesson(lesson._id, module._id, indexL + 1)} style={indexT === open ? {display: 'flex'} : {display: 'none'}} className={lesson.success === true ? "classItem complete" : "classItem"}>
                            <div className="progressVertical">
                                <div className="ball"></div>
                                <div className="line"></div>
                            </div>
                            <div className="classL">
                                <div className="image" style={{backgroundImage: `url(${lesson.image})`}}></div>
                                <div className="text">
                                    <div className="title">{lesson.lesson} - {lesson.name}</div>
                                    <div className="description">{lesson.description}</div>
                                </div>
                                <div className="progressBar">
                                    {subscription === false ? 
                                        <div className="bar" style={{width: '50px'}}>
                                            <i style={{fontSize: '23px'}} className="fas fa-lock"></i>
                                        </div>
                                        :
                                        <div className="bar">
                                            <div className="line-bar">
                                                <div className="line-conclusion"></div>
                                            </div>
                                            <span className='conclusion'>{lesson.success === true ? "100%" : "0%"} concluído</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                } else {
                    return null
                }
            })}
            </Fragment>
        )
    })}

    return (
        <Fragment>
            {redirectPage(modules)}
            <h3>Módulos do Curso</h3>
            <div className="classes">
                {subscription === false &&
                <div className='banner'>
                    <img src={Chave} alt=''></img>
                    <div className="text">
                        <span className='title'>Tenha acesso as aulas de inglês!</span>
                        <span className='description'>Faça uma assinatura para acessar todas as lições e continue aprendendo.</span>
                        <Link to='/dashboard' className="button-form"><i className="fas fa-key"></i> Liberar acesso a todas as aulas agora</Link>
                    </div>
                </div>                
                }
                <div className="lineCalc">
                    {mapDivs()}
                </div>
            </div>
        </Fragment>
    );
}

export default Classes;