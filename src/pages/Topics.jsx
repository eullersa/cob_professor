import { Fragment } from 'react';
import Menu from "../components/menu/Menu";
import Footer from '../components/footer/Footer'
import AllTopics from '../components/topics/AllTopics.jsx';
import { useState } from 'react';

function Topics() {

    const [coursesDrop, setCoursesDrop] = useState(undefined)

    return (
        <Fragment>
            <Menu bulb={true} items={[
                {name: 'inicial', link: '/dashboard'},
                {name: 'módulos', link: '/modulos'},
                {name: 'ao vivo', link: '/live'},
                {name: 'preços', link: '/precos'}
            ]} links={[
            {name: 'perfil', link: '/profile', type: 'button', function: 'signout'},
            {name: 'sair', link: '', type: 'text', onclick: 'signout'}
            ]} longer={'longer'} coursesDrop={coursesDrop} courses={true} />
            <div className='spaceContent'></div>

            <AllTopics setCoursesDrop={setCoursesDrop} />

            <Footer over={false} />
        </Fragment>
    )
}

export default Topics;