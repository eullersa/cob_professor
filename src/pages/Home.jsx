import { Fragment, useRef } from 'react';
import Menu from '../components/menu/Menu.jsx'
import Banner from '../components/banner/Banner.jsx'
import Subjects from '../components/subjects/Subjects.jsx';
import WeOffer from '../components/weoffer/WeOffer.jsx';
import HomeOffice from '../components/homeoffice/HomeOffice.jsx';
import ForWho from '../components/forwho/ForWho.jsx';
import StartHere from '../components/starthere/StartHere';
import Testimonials from '../components/testimonial/Testimonials.jsx';
import Marks from '../components/marks/Marks.jsx';
import Footer from '../components/footer/Footer.jsx';

function Home() {

  const ref = useRef(null)

  return (
    <Fragment>
        <Menu items={[
          {name: 'inicial', link: '/'},
          {name: 'equipe', link: '/equipe'},
          {name: 'preços', link: '/precos'},
        ]} links={[
          {name: 'entrar', link: '/login', type: 'text'},
          {name: 'registrar', link: '/register', type: 'button'}
        ]} />
        <div className='spaceContent'>
          <Banner childRef={ref} />
          <Subjects />        
          <StartHere forwardRef={ref} />
          <ForWho />
          <HomeOffice />
          <Testimonials />
          <WeOffer />
          <Marks />
          <Footer />
        </div>
    </Fragment>
  )
}

export default Home;
