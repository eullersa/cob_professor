import MiniMenu from '../components/mini-menu/MiniMenu.jsx';
import MiniFooter from '../components/mini-footer/MiniFooter.jsx';
import Form from '../components/formlogin/Form.jsx';

function ResetPassword() {

  return (
    <div className='signupPage'>
        <MiniMenu />
        <Form text={'Redefina sua senha'} message={'Para redefinir sua senha, digite o endereço de e-mail que você usa para fazer login.'} validation={false} info={'Já possui uma conta?'} redirect={'Faça o login'} link={'/login'} button={'Enviar pedido'} passwordField={false}/>
        <MiniFooter />
    </div>
  )
}

export default ResetPassword;