import { Fragment, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import { register, login, authenticate, resetPassword, insertNewPassword } from '../../apis/requests'
import { GoogleLogin } from 'react-google-login';

function Form({googleForm, text, validation, info, redirect, button, link, message, passwordField = true, emailField = true, confirmPasswordField = false, nameField = false, reset='/reset', formType}) {

  const { id } = useParams()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [redirectReferrer, setRedirect] = useState(false)
  const [messageR, setMessage] = useState('')
  const [success, setSuccess] = useState(undefined)
  const [data, setData] = useState({
    ...(nameField === true ? {name: ''} : undefined),
    ...(emailField === true ? {email: ''} : undefined),
    ...(passwordField === true ? {password: ''} : undefined),
    ...(confirmPasswordField === true ? {confirmPassword: ''} : undefined),
    role: 'teacher'
  })

  const forgotPassword = (validation) => {
    if(validation === true) {
      return (
        <Link to={reset} className="card-text last">Esqueceu a sua senha?</Link>
      )
    } else {
      return null
    }
  }

  const password = (validation) => {
    if(validation === true) {
      return (
        <div className="form-group">
          <i className="fas fa-lock"></i>
          <input type="password" onChange={handleChange('password')} className="form-control last" id="exampleInputPassword1" placeholder="Senha" />
        </div>
      )
    } else {
      return null
    }
  }

  const confirmPassword = (validation) => {
    if(validation === true) {
      return (
        <div className="form-group">
          <i className="fas fa-lock"></i>
          <input type="password" onChange={handleChange('confirmPassword')} className="form-control last" id="exampleInputPassword2" placeholder="Confirme sua senha" />
        </div>
      )
    } else {
      return null
    }
  }

  const name = (validation) => {
    if(validation === true) {
      return (
        <div className="form-group">
          <i className="fas fa-user"></i>
          <input type="name" onChange={handleChange('name')} className="form-control last" id="exampleInputname1" placeholder="Nome" />
        </div>
      )
    } else {
      return null
    }
  }

  const email = (validation) => {
    if(validation === true) {
      return (
        <div className="form-group">
          <i className="fas fa-envelope"></i>
          <input type="email" onChange={handleChange('email')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" required />
        </div>
      )
    } else {
      return null
    }
  }

  const responseGoogle = async(response) => {
    await fetch(`${process.env.REACT_APP_SERVER_API}/user/google/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({idToken: response.tokenId})
    })
    .then(response => response.json())
    .then(response => {
      if(response.success === false) {
        setSuccess(false)
        setLoading(false)
        setError(response.message)
      } else {
        setSuccess(true)
        setMessage(response?.message)
        delete response.success
        authenticate(response, () => {
          setRedirect(true)
        })
      }
    })
    .catch(error => console.error(error))
  }
  
  const google = (validation, button) => {
    if(validation === true) {
      return (
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          render={renderProps => (
            <button onClick={renderProps.onClick} disabled={renderProps.disabled} type="button" className="btn btn-form google"><span className="fa-brands fa-google" style={{margin: 0, padding: 0, fontSize: 20}}></span> {button}</button>
          )}
          cookiePolicy={'single_host_origin'}
        />
      )
    } else {
      return null
    }
  }
  
  const alertMessage = (validation) => {
    if(validation === true) {
      return (
        <div className="alert alert-success" role="alert">
          {messageR}
        </div>
      )     
    } else if (validation === false) {
      return (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )
    } else {
      return null
    }
  }

  const handleSubmit = type => (event) => {
    event.preventDefault()
    setLoading(true)
    if(type === 'login') {
      login(data)
        .then(response => {
          if(response.success === false) {
            setSuccess(false)
            setLoading(false)
            setError(response.message)
          } else {
            setSuccess(true)
            setMessage(response?.message)
            delete response.success
            authenticate(response, () => {
              setRedirect(true)
            })
          }
        })
        .catch(error => console.error(error))
    } else if (type === 'register') {
      register(data)
        .then(response => {
          if(response.success === false) {
            setSuccess(false)
            setLoading(false)
            setError(response.message)
          } else {
            setSuccess(true)
            setLoading(false)
            setMessage(response?.message)
          }
        })
        .catch(error => console.error(error))
    } else if (type === 'reset') {
      resetPassword(data)
        .then(response => {
          if(response.success === false) {
            setSuccess(false)
            setLoading(false)
            setError(response.message)
          } else {
            setSuccess(true)
            setLoading(false)
            setMessage(response?.message)
          }
        })
    } else if (type === 'insertnewpassword') {
      insertNewPassword(id, data)
        .then(response => {
          if(response.success === false) {
            setSuccess(false)
            setLoading(false)
            setError(response.message)
          } else {
            setSuccess(true)
            setLoading(false)
            setMessage(response?.message)
          }
        })
    }
  }

  const handleChange = name => event => {
    setData({...data, [name]: event.target.value})
  }

  const redirecting = (validation) => {
    if(validation === true) {
      return (<Redirect to='/dashboard'></Redirect>)
    } else {
      return null
    }
  }

  return (
    <Fragment>
      <div id='form'>
        {redirecting(redirectReferrer)}
        <span>{text}</span>
        <div className="card">
          <div className={loading ? 'loading show' : 'loading' }>
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          <div className="card-body">
            {alertMessage(success)}
            <p className="card-text">{message}</p>

            {/* Formulário */}
            <form onSubmit={handleSubmit(formType)}>
              {name(nameField)}
              {email(emailField)}
              {password(passwordField)}
              {confirmPassword(confirmPasswordField)}
              {forgotPassword(validation)}
              <button type="submit" className="btn btn-form">{button}</button>
              {google(googleForm?.verification, googleForm?.button)}
            </form>
          </div>
        </div>

        {/* Registrar / Login */}
        <span className='changeForm'>{info} <Link to={link} className='link'>{redirect}</Link></span>
      </div>
    </Fragment>
  );
}

export default Form;