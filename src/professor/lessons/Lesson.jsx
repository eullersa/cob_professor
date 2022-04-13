import Profile from "../profile/Profile.jsx";
import Courses from "./lessons/Lessons.jsx";

function Course({setForm, courses, link, subject}) {
    return (
        <div id='progress'>
            <div className="progress-content">
                <div className='content-left'>
                    <Profile />
                </div>
                <div className='content-right' style={{textAlign: 'center'}}>
                    <div className="flex">
                        <Courses setForm={setForm} subject={subject} link={link} courses={courses} title={'Minhas aulas'} emptyMessage={'Você ainda não possui nenhuma aula'} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Course;