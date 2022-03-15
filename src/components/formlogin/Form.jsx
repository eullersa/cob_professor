import { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { register, login, authenticate } from '../../apis/requests'

function Form({text, validation, info, redirect, button, link, message, passwordField = true, nameField = false, reset='/reset', formType}) {

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [redirectReferrer, setRedirect] = useState(false)
  const [success, setSuccess] = useState(undefined)
  const [data, setData] = useState({
    ...(nameField === true ? {name: ''} : undefined),
    email: '',
    ...(passwordField === true ? {password: ''} : undefined),
    origin: `${window.location.origin.replace("https://", "").replace("http://", "")}`
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
  
  const alertMessage = (validation) => {
    if(validation === true) {
      return (
        <div className="alert alert-success" role="alert">
          Usuário criado com sucesso!
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
          }
        })
        .catch(error => console.error(error))
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
              <div className="form-group">
                <i className="fas fa-envelope"></i>
                <input type="email" onChange={handleChange('email')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" />
              </div>
              {password(passwordField)}
              {forgotPassword(validation)}
              <button type="submit" className="btn btn-form">{button}</button>
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