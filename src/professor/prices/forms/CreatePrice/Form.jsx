import { Fragment, useEffect, useState } from 'react';
import { Authenticated, priceCreate, priceDelete, pricesGet } from '../../../../apis/requests'
import './index.scss'

function Form({text, button, sendForm, inputs, defaultState, setCourses, photoModel, id, form}) {

  const currency = (money) => {
   return money.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
  }

  const { token } = Authenticated()
  // create photo
  const defaultPrices = {site: form?.site, _id: form?._id}

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(undefined)
  const [message, setMessage] = useState('undefined')
  const [prices, setPrices] = useState([])
  const [data, setData] = useState({
    ...defaultPrices,
    [inputs[0].inputs[0].setInput]: currency(inputs[0].inputs[0].defaultValue),
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
    await priceCreate(token, data)
    .then(response => {
      if(response.success) {
        setLoading(false)
        setSuccess(true)
        setMessage(response.message)
        setPrices(response.prices)
      } else {
        setLoading(false)
        setSuccess(false)
        setError(response.message)
      }
    })
  }

  useEffect(() => {
    pricesGet(token, defaultPrices._id)
    .then(response => {
      setPrices(response.prices)
    })
  }, [token, defaultPrices._id])

  const handleChange = name => event => {
    if(name === 'months') {
      setData({...data, [name]: event.target.value})
    } else {
      
      const numberValue = Number(event.target.value.replace(/[^0-9-]+/g,""))/100
      setData({...data, [name]: currency(Number(numberValue))})
    }
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

              {inputs.map((inp, i) => {
                return (
                  <Fragment key={i}>
                  <p className="card-text" >{inp.label}</p>
                  {inp.inputs.map((input, i) => {

                    if(input.setInput !== 'months') {
                      return (
                        <div className="form-group" key={i}>
                          {(() => {
                              return (
                                <input type={'text'} value={data[input.setInput]} onChange={handleChange(input.setInput)} className="form-control" min={input.min} max={input.max} placeholder={input.placeholder} required step={0.01} />
                              )
                          })()}
                        </div>
                      )
                    } else {
                      return (
                        <div className="form-group" key={i}>
                          {(() => {
                              return (
                                <input type={input.type} value={data[input.setInput]} onChange={handleChange(input.setInput)} className="form-control" min={input.min} max={input.max} placeholder={input.placeholder} required />
                              )
                          })()}
                        </div>
                      )
                    }
                  })}
                  </Fragment>
                )
              })}
              {
                prices.length > 0 &&
                <div className='prices'>
                {prices?.map((p, i) => {
                  return(
                    <div className='blockPrice' key={i} >
                      <div className='price'>{currency(p.value)}</div><div className='months'>x{p.months}</div>
                      <div className='delete' style={{cursor: 'pointer'}} onClick={() => {
                        priceDelete(token, p._id)
                        .then((res) => setPrices(res.prices))
                      }}>❌</div>
                    </div>
                  )
                })}
                </div>
              }
              
              <button type="submit" disabled={prices?.length >= 3} className="btn btn-form">{button}</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Form;