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
                                    <Link to={`${link}/${course.name}`} style={{color: 'inherit', textDecoration: 'none'}}><div className="name">{course.name}</div></Link>
                                    <div className="origin">{course.origin}</div>
                                </div>
                            </div>
                            <div className="right">
                                <div className="remove" onClick={(() => setForm({form: "delete", name: course.name}))}>❌</div>
                                <div className="edit" onClick={(() => setForm({form: "update", ...courses[i]}))}>editar</div>
                                <div className="edit" onClick={(() => setForm({form: "theme", ...courses[i]}))}>temas</div>
                                <Link to={`creator/site/${course.name}`} style={{textDecoration: 'none', color: 'inherit'}}><div className="edit">site</div></Link>
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