import { Fragment } from 'react';
import Menu from "../components/menu/Menu";
import Footer from '../components/footer/Footer'
import AllTopics from '../components/topics/AllTopics.jsx';
import { useState } from 'react';

function Topics() {

    const [coursesDrop, setCoursesDrop] = useState(undefined)

    return (
        <Fragment>
            <AllTopics setCoursesDrop={setCoursesDrop} />
        </Fragment>
    )
}

export default Topics;