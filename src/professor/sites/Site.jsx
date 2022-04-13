import Profile from "../profile/Profile.jsx";
import Sites from "./sites/Sites.jsx";

function Site({setForm, courses, link, subject}) {
    return (
        <div id='progress'>
            <div className="progress-content">
                <div className='content-left'>
                    <Profile />
                </div>
                <div className='content-right' style={{textAlign: 'center'}}>
                    <div className="flex">
                        <Sites setForm={setForm} subject={subject} link={link} courses={courses} title={'Meus sites'} emptyMessage={'Você ainda não possui nenhum site'} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Site;