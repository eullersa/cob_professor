import { Fragment } from "react";
import { Link } from "react-router-dom";
import './datas.scss'

function Datas({setForm, courses, emptyMessage, title, link, subject}) {

    const coursesMap = (courses) => {
        return (
            courses?.map((course, i) => {
                return (
                    <Fragment key={i}>
                        <div className="course" style={{width: "100%"}}>
                            <div className="left">
                                {
                                    course.image &&
                                    <img src={`${course.image}`} className='logo-site' alt="Logo" />
                                }
                                <div>
                                    <div className="nameWo">{course.name}</div>
                                    <div className="origin">{course.description}</div>
                                </div>
                            </div>
                            <div className="right">
                                <div className="remove" onClick={(() => setForm({form: "delete", name: course._id}))}>❌</div>
                                <div className="edit" onClick={(() => setForm({form: "update", ...courses[i]}))}>editar</div>
                            </div>
                        </div>                    
                    </Fragment>
                )
            })
        )
    }

    const myCourses = () => {
        if(courses?.length) {
            return (coursesMap(courses))
        } else {
            return null
        }
    }

    return (
        <div id='datas'>

            {
                courses?.message &&
                <p className="sites">{courses?.message}</p>
            }


            {
                (courses?.length > 0) &&
                (<p className="sites">{title}</p>)
            }

            {
                (courses?.length === 0) &&
                (
                    <>
                        <p>{emptyMessage}</p>
                        <button onClick={() => setForm({form: "create"})} className='button'>Criar {subject}</button>
                    </>
                )
            }

            {myCourses()}
            
            {
                (courses?.length > 0) &&
                (<button onClick={() => setForm({form: "create"})} style={{marginTop: 10}} className='button'>Criar {subject}</button>)
            }
        </div>
    );
}

export default Datas;