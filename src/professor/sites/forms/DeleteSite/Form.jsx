import { Fragment, useState } from 'react';
import { Authenticated, deleteImage, modelDelete } from '../../../../apis/requests';
import './index.scss'

function Form({text, name, setForm, setCourses, photoModel}) {

  const { token } = Authenticated()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(undefined)
  const [message, setMessage] = useState('undefined')
  
  const alertMessage = (validation) => {
    if(validation === true) {
      return (
        <div className="alert alert-success" role="alert">
          {message}
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

  const sendButton = async() => {
    setLoading(true)

    await deleteImage(name, photoModel, token)
    .catch(error => console.error(error))

    await modelDelete(name, photoModel, token)
    .then((response) => {
      if(response.success === false) {
        setSuccess(false)
        setLoading(false)
        setMessage("Algo deu errado")
        setForm(false)
      } else {
        setSuccess(true)
        setLoading(false)
        setMessage("Excluído com sucesso!")
        setCourses(response.sites)
        setForm(false)
      }
    })
    .catch(error => console.error(error))
    setForm(false)

  }

  return (
    <Fragment>
      <div id='form' className='formTeacher'>
        <span>{text}</span>
        <div className="card">
          <div className={loading ? 'loading show' : 'loading' }>
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          <div className="card-body">
            {alertMessage(success)}
            <form>
              <p style={{textAlign: 'center'}}>Você tem certeza que deseja excluir?</p>
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10}}>
                <button type="button" className="btn btn-form deleteform" onClick={() => sendButton()}>Sim</button>
                <button type="button" className="btn btn-form deleteform" onClick={() => setForm(false)}>Não</button>
              </div>           
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Form;