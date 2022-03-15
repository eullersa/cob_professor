import { useState } from "react";
import Profile from "./profile/Profile";
import Datas from "./datas/Datas";

function Dashboard({setCoursesDrop}) {

    const [progressData, setProgress] = useState(undefined)

    return (
        <div id='progress'>
            <div className="progress-content">
                <div className='content-left'>
                    <Profile />
                </div>
                <div className='content-right'>
                    <div className="flex">
                        <Datas />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;