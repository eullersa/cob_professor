import { Fragment, useEffect, useState } from 'react';
import { Authenticated, themeChange, themeGet } from '../../../../apis/requests'
import './index.scss'

function Form({text, button, inputs, form}) {

  const { token } = Authenticated()
  // create photo

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(undefined)
  const [message, setMessage] = useState('undefined')
  const [data, setData] = useState({
    name: form.name,
    [inputs[0].inputs[0].setInput]: inputs[0].inputs[0].defaultValue
  })
  
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

  const handleSubmit = async(event) => {
    event.preventDefault()
    setLoading(true)
    await themeChange(token, data)
      .then(response => {
        if(response.success) {
          setLoading(false)
          setSuccess(true)
          setMessage(response.message)
        } else {
          setLoading(false)
          setSuccess(false)
          setError(response.message)
        }
      })
  }

  useEffect(() => {
    themeGet(form.name)
    .then(response => {
      setData(prev => ({...prev, theme: response.theme}))
    })
  }, [token, form.name])

  const handleChange = name => event => {
    setData({...data, [name]: event.target.value})
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
            <form onSubmit={handleSubmit}>

              {
              inputs.map((inp, i) => {
                return (
                  <Fragment key={i}>
                  <p className="card-text" >{inp?.label}</p>
                  {inp?.inputs.map((input, i) => {

                      if(input.type === 'select') {

                        return (
                          <select key={i} value={data[input.setInput]} onChange={handleChange(input.setInput)} style={{marginBottom: 20}} className="form-select" aria-label="Default select example">
                            {
                              input.options.map((op, i) => {
                                return (<option key={i} value={op.value}>{op.text}</option>)
                              })
                            }
                          </select>
                        )

                      } else {
                        return (
                          <div className="form-group" key={i}>
                            {(() => {
                                return (
                                  <input type={input.type} value={data[input.setInput]} onChange={handleChange(input.setInput)} className="form-control" placeholder={input.placeholder} required />
                                )
                            })()}
                          </div>
                        )
                      }
                  })}
                  </Fragment>
                )
              })
              }
              
              <button type="submit" className="btn btn-form">{button}</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Form;