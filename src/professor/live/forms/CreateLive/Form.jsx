import { Fragment, useEffect, useState } from 'react';
import { Authenticated, liveCreate, liveDelete, liveGet } from '../../../../apis/requests'
import './index.scss'

function Form({text, button, sendForm, inputs, defaultState, setCourses, photoModel, id, form}) {

  const { token } = Authenticated()
  // create photo
  const defaultPrices = {site: form?.site, _id: form?._id}

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(undefined)
  const [message, setMessage] = useState('undefined')
  const [live, setLive] = useState([])
  const [data, setData] = useState({
    site: defaultPrices.site,
    course: defaultPrices._id,
    [inputs[0].inputs[0].setInput]: inputs[0].inputs[0].defaultValue,
    [inputs[1].inputs[0].setInput]: inputs[1].inputs[0].defaultValue
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
    await liveCreate(token, data)
    .then(response => {
      if(response.success) {
        setLoading(false)
        setSuccess(true)
        setMessage(response.message)
        setLive(response?.live)
      } else {
        setLoading(false)
        setSuccess(false)
        setError(response.message)
      }
    })
  }

  useEffect(() => {
    liveGet(token, defaultPrices._id)
    .then(response => {
      setLive(response?.live)
    })
  }, [token, defaultPrices._id])

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

              {
                live.length > 0 &&
                <div style={{justifyContent: 'center'}} className='prices'>
                {live?.map((p, i) => {
                  return(
                    <div className='blockPrice' key={i} >
                      <div className='price'>{p.type === 'meet' ? 'Google Meet' : 'Zoom'}</div>
                      <div className='delete' style={{cursor: 'pointer'}} onClick={() => {
                        liveDelete(token, p?._id)
                        .then(response => setLive(response.live))
                      }}>❌</div>
                    </div>
                  )
                })}
                </div>
              }
              
              <button type="submit" disabled={live?.length >= 1 || data['url'].length === 0} className="btn btn-form">{button}</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Form;