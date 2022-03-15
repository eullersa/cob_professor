import { Fragment, useState, useEffect } from "react";
import { Link, Redirect, useHistory } from 'react-router-dom'
import Chave from "../../imgs/dashboard/chave.png";
import { Authenticated, CurrentModule, UpdateLesson, NextModule, windowTop } from "../../apis/requests";

function Classes({progress, setCoursesDrop}) {

    // Get all modules and lessons    
    const [current, setCurrent] = useState(undefined)
    const { token, name } = Authenticated()
    const history = useHistory()

    useEffect(() => {
        CurrentModule(setCurrent, token, progress, undefined, setCoursesDrop, history)
    }, [token, progress, setCoursesDrop, history])

    // redirect

    /*

    const redirectPage = (validation) => {
        if(validation === true) {
          return (<Redirect to='/courses'/>)
        } else {
          return null
        }
    }

    */

    const updateLesson = (lessonId, moduleId, lessonNumber) => {
        UpdateLesson(setCurrent, token, lessonId, current, lessonNumber, moduleId)
    }

    const nextModule = (id) => {
        NextModule(setCurrent, token, id)
    }

    const currentModuleOrLesson = () => {
        if(current?.next === current?.lessons?.length && current?.lessons?.length > 0 && current?.nextModule?.name !== undefined) {
            return (<div className='currentLesson'>
                <div className='img' style={{backgroundImage: `url(${current?.nextModule?.image})`}}></div>
                <div className="text">
                    <span className='description'>Próximo módulo</span>
                    <span className='title'>{current?.nextModule?.name}</span>
                    <span className='description'>{current?.nextModule?.description}</span>
                    {current?.subscription === false ?
                        <Link to='/precos' className="button-form"><i className="fas fa-key"></i> Liberar acesso a todas as aulas agora</Link>
                        :
                        <Link to='/precos' className="button-form">Começar</Link>
                    }
                    {/*<div className="button">
                        <button onClick={() => nextModule(current?.nextModule?._id)} className="btn button-form">Começar</button>
                    </div>*/}
                </div>
            </div>)
        } else if (current?.lessons?.length > 0 && current?.lesson?.name !== undefined) {
            return (<div className='currentLesson'>
                <div className='img' style={{backgroundImage: `url(${current?.lesson?.image})`}}></div>
                <div className="text">
                    <span className='title'>Lição {current?.lessonNumber} - {current?.lesson?.name}</span>
                    <span className='description'>{current?.lesson?.description}</span>
                    {current?.subscription === false ?
                        <Link to='/precos' className="button-form"><i className="fas fa-key"></i> Liberar acesso a todas as aulas agora</Link>
                        :
                        <Link to='/precos' className="button-form" style={{background: 'var(--buttonColor)', color: 'var(--buttonText)'}}>Começar agora</Link>
                    }
                </div>
            </div>)
        } else {
            return null
        }
    }

    return (
        <Fragment>
            {/* redirectPage(current) */}
            <h3>Oi, {name.charAt(0).toUpperCase() + name.slice(1)} - {current?.percentage >= 0 ? current?.percentage || 0 : '...'}%</h3>

            <div className="classes">
                {current?.subscription === false && 
                    <div className='banner'>
                        <img src={Chave} alt=''></img>
                        <div className="text">
                            <span className='title'>Tenha acesso as aulas de inglês!</span>
                            <span className='description'>Faça uma assinatura para acessar todas as lições e continue aprendendo.</span>
                            <Link to='/precos' className="button-form"><i className="fas fa-key"></i> Liberar acesso a todas as aulas agora</Link>
                        </div>
                    </div>                
                }

                {/* current Lesson */}

                {currentModuleOrLesson()}

                <div className="lineCalc">
                    {current?.lessons && 
                        current.lessons.map((lesson, i) => {
                            return (<div className={lesson?.success === true ? 'classItem complete' : 'classItem'} onClick={() => updateLesson(lesson._id, current.current._id, i + 1)} key={i}>
                                <div className="progressVertical">
                                    <div className="ball"></div>
                                    <div className="line"></div>
                                </div>
                                <Link className="class" to={current?.subscription ? `/lesson/${lesson?.slug}` : '/precos'}>
                                    <div className="image" style={{backgroundImage: `url("${lesson.image}")`}}></div>
                                    <div className="text">
                                        <div className="title">Lição {i + 1} - {lesson.name}</div>
                                        <div className="description">{lesson.description}</div>
                                    </div>
                                    <div className="progressBar">
                                    {current?.subscription === false ? 
                                        <div className="bar" style={{width: '40px'}}>
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
                                </Link>
                            </div>)
                        })
                    }
                
                {current?.nextModule &&
                    <div className="classItem next">
                        <div className="progressVertical">
                            <div className="ball"><i className="fas fa-caret-right"></i></div>
                            <div className="line"></div>
                        </div>
                        <div className="class">
                            <div className="image" style={{backgroundImage: `url("${current?.nextModule?.image}")`}}></div>
                            <div className="text">
                                <div className="next">Próximo módulo</div>
                                <div className="title">{current?.nextModule.name}</div>
                                <div className="description">{current?.nextModule.description}</div>
                            </div>
                            <div className="button">
                                <button onClick={() => { 
                                    nextModule(current?.nextModule?._id) 
                                    windowTop()
                                }} className="btn button-form">Começar</button>
                            </div>
                        </div>
                    </div>
                }
                </div>
            </div>
        </Fragment>
    );
}

export default Classes;