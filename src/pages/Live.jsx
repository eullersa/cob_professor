import MiniMenu from '../components/mini-menu/MiniMenu.jsx';
import MiniFooter from '../components/mini-footer/MiniFooter.jsx';
import Live from '../components/live/Live.jsx';

function Register() {

  return (
    <div className='signupPage'>
        <MiniMenu link={'/dashboard'} />
        <Live text={'A live já começou! Não fique de fora.'} platform={'googleMeet'}/>
        <MiniFooter message={'Tenha uma experiência ainda maior com um professor experiente.'} />
    </div>
  )
}

export default Register;