import Classes from "./classes/Classes.jsx";

export default function AllTopics({setCoursesDrop}) {

    return (
        <div id='topics'>
            <div className="topics-content">
                <div className='content'>
                    <Classes setCoursesDrop={setCoursesDrop} />
                </div>
            </div>
        </div>
    );
}