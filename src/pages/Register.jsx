import MiniMenu from '../components/mini-menu/MiniMenu.jsx';
import MiniFooter from '../components/mini-footer/MiniFooter.jsx';
import Form from '../components/formlogin/Form.jsx';
function Register() {

  return (
    <div className='signupPage'>
        <MiniMenu />
        <Form text={'Crie a sua conta'} formType={'register'} message={'Cadastre-se com email e senha'} validation={false} info={'Já tem uma conta?'} redirect={'Faça o login'} link={'/login'} button={'Cadastrar'} nameField={true}/>
        <MiniFooter />
    </div>
  )
}

export default Register;