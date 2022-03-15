import MiniMenu from '../components/mini-menu/MiniMenu.jsx';
import MiniFooter from '../components/mini-footer/MiniFooter.jsx';
import Form from '../components/formlogin/Form.jsx';

function Login() {

  return (
    <div className='signupPage'>
        <MiniMenu />
        <Form text={'Faça o seu login'} message={'Digite o seu email e senha'} formType={'login'} validation={true} info={'Não possui uma conta?'} redirect={'Cadastre-se'} link={'/register'} button={'Entrar'}/>
        <MiniFooter />
    </div>
  )
}

export default Login;