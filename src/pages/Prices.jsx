import MiniMenu from '../components/mini-menu/MiniMenu.jsx';
import MiniFooter from '../components/mini-footer/MiniFooter.jsx';
import Shop from '../components/shop/Shop.jsx';

function Register() {

  return (
    <div className='signupPage'>
        <MiniMenu link={'/dashboard'} />
        <Shop text={'Tenha acesso a todo o curso de inglês'} message={'Curso de Inglês'} button={'Pagar pelo PicPay'}/>
        <MiniFooter message={'Ao finalizar sua compra pelo o PicPay, sua assinatura será renovada automaticamente.'} />
    </div>
  )
}

export default Register;