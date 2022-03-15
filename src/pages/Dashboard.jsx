import Menu from '../components/menu/Menu.jsx'
import Footer from '../components/footer/Footer.jsx';
import Dashboard from '../professor/dashboard/Dashboard';
import { useState } from 'react';

function Home() {

  const [coursesDrop, setCoursesDrop] = useState(undefined)

  return (
    <>
        <Menu bulb={true} items={[
          {name: 'sites', link: '/dashboard'},
          {name: 'alunos', link: '/dashboard'},
          {name: 'cursos', link: '/dashboard'},
          {name: 'lições', link: '/dashboard'},
          {name: 'questões', link: '/dashboard'},
        ]} courses={false} links={[
          {name: 'perfil', link: '/profile', type: 'button', function: 'signout'},
          {name: 'sair', link: '', type: 'text', onclick: 'signout'}
        ]} longer={'longer'} coursesDrop={coursesDrop} />
        <div className='spaceContent'></div>

        <Dashboard setCoursesDrop={setCoursesDrop} />

        <Footer over={false} />
    </>
  )
}

export default Home;
