import Profile from "../profile/Profile.jsx";
import Courses from "./modules/Modules.jsx";

function Course({setForm, courses, link, subject}) {
    return (
        <div id='progress'>
            <div className="progress-content">
                <div className='content-left'>
                    <Profile />
                </div>
                <div className='content-right' style={{textAlign: 'center'}}>
                    <div className="flex">
                        <Courses setForm={setForm} subject={subject} link={link} courses={courses} title={'Meus módulos'} emptyMessage={'Você ainda não possui nenhum módulo'} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Course;