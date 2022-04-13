import MiniMenu from '../components/mini-menu/MiniMenu.jsx';
import MiniFooter from '../components/mini-footer/MiniFooter.jsx';
import Form from '../components/formlogin/Form.jsx';

function ResetPassword() {

  return (
    <div className='signupPage'>
        <MiniMenu />
        <Form text={'Crie uma nova senha'} message={'Repita sua senha duas vezes.'} validation={false} info={'Já possui uma conta?'} redirect={'Faça o login'} link={'/login'} button={'Enviar'} confirmPasswordField={true} emailField={false} passwordField={true} formType={'insertnewpassword'}/>
        <MiniFooter />
    </div>
  )
}

export default ResetPassword;