import { Fragment, useState, useEffect } from 'react';
import dayjs from "dayjs";
import { Redirect, useHistory } from 'react-router';
import { picPay, RequestPrices, Authenticated } from '../../apis/requests'

function Shop({text, button, message}) {

  var utc = require('dayjs/plugin/utc')
  var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
  dayjs.extend(utc)
  dayjs.extend(timezone)

  const { token } = Authenticated()
  const [prices, setPrices] = useState([])
  const history = useHistory()

  useEffect(() => {
    RequestPrices(setPrices, setMonth, setPrice, setIdValue, token, history)
  }, [token, history])

  const currency = (str) => {
    return str.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}).replace(" ", "")
  }

  const calcPrices = (months, value, id) => {
    setMonth(months)
    setPrice(value)
    setIdValue(id)
  }

  const [qrCode, setQrCode] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [paid, setPaid] = useState(false)
  const [month, setMonth] = useState(undefined)
  const [price, setPrice] = useState(undefined)
  const [idValue, setIdValue] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    cpf: '',
    phone: '',
  })
  
  const {cpf, phone} = data

  const divMonths = prices?.sort(function (a, b) {
    return a.months - b.months
  })?.map((price, i) => {
    return (
      <div className={price.months === month ? 'month clicked' : 'month'} key={i} 
        onClick={() => calcPrices(price.months, price.value, price._id)}>
        {price.months} {price.months > 1 ? 'meses' : 'mês'}
      </div>
    )
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    picPay(token, cpf, phone, idValue, setData, setQrCode, setPaid, setRedirect, setLoading)
  }

  const handleChange = name => event => {
    setData({...data, [name]: event.target.value})
  }

  const redirectPage = (validation) => {
    if(validation === true) {
      return (<Redirect to='/dashboard' />)
    } else {
      return null
    }
  }

  const qrOn = (validation) => {
    if (validation === false) {
      return (
        <Fragment>
          <div className={loading ? 'loading show' : 'loading' }>
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          <div className="card-body">
            <p className="card-title">{message}</p>
            <div className='months'>
              {divMonths}
            </div>
            <div className="priceText">Por apenas <span className='priceValue'>{currency(price || 0)}</span></div>
            <p className="card-text">Por favor, confirme seus dados abaixo:</p>
            {/* Formulário */}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <i className="fas">👤</i>
                <input type="text" onChange={handleChange('cpf')} value={cpf} required={true} className="form-control" id="cpf" aria-describedby="cpf" placeholder="CPF" />
              </div>
              <div className="form-group">
                <i className="fas">📱</i>
                <input type="text" onChange={handleChange('phone')} value={phone} required={true} className="form-control" id="phone" aria-describedby="phone" placeholder="Número de celular" />
              </div>
              <button type="submit" className="btn btn-form">{button}</button>
            </form>
          </div>
        </Fragment>
      )
    } else {      
      return (
        <Fragment>
          <div className='imageQr'>
            <img style={{width: '100%'}} className='qrCodeImg show' src={validation} alt='PicPay QrCode' />
            <div className={paid === true ? 'overImage show' : 'overImage'}>
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </Fragment>
      )
    }
  }

  return (
    <Fragment>
      <div id='shop'>
        {redirectPage(redirect)}
        {qrCode ?
          <span className='text'>Por favor, não saia da página até finalizar a compra</span> : 
          <span className='text'>{text}</span>
        }
        <div className={qrCode === false ? "card" : 'card qrCode'}>
          {qrOn(qrCode)}
        </div>
      </div>
    </Fragment>
  );
}

export default Shop;