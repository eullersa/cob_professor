import { useState } from "react";

function Dashboard({setCoursesDrop}) {

    const [progressData, setProgress] = useState(undefined)

    return (
        <div id='progress'>
            <div className="progress-content">
                <div className='content-left'>
                    a
                </div>
                <div className='content-right'>
                    a
                </div>
            </div>
        </div>
    );
}

export default Dashboard;