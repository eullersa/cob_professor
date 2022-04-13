import { Fragment, useState, useRef } from 'react';
import { Authenticated, sendImage, modelUpdate } from '../../../../apis/requests'
import './index.scss'

function Form({text, button, setForm, inputs, setCourses, photoModel, course, id}) {

  const { token } = Authenticated()

  // create photo
  const [profilePic, setProfilePic] = useState({image: course.image})

  /*
    
  const sendUserImage = async(image, type) => {
      await sendImage(image, type, photoModel, token)
      .then((response) => {
        setProfilePic(image)
        console.log(response)
      })
  }

  */

  const photoButton = useRef()

  const photo = async(e) => {
      let verifyImage = e?.target?.files[0]?.type?.includes('image')
      if(verifyImage) {
          let image = await convertTo64(e.target.files[0])
          setProfilePic({image: image, type: e?.target?.files[0]?.type})
      } else {
          console.error('Isso não é uma imagem')
      }
  }

  const convertTo64 = (file) => {
      let width = 300

      return new Promise((resolve, reject) => {
          const photo = new FileReader()
          photo.readAsDataURL(file)
          photo.onload = () => {
              var image = new Image()
              image.src = photo.result
              image.size = photo.size
              image.onload = (e) => {
                  var elem = document.createElement('canvas')
                  var scaleFactor = width / e.target.width
                  elem.width = width
                  elem.height = e.target.height * scaleFactor
                  var ctx = elem.getContext('2d')
                  ctx.drawImage(e.target, 0,0, elem.width, elem.height)
                  var base64 = ctx.canvas.toDataURL(e.target, 'image/jpeg', 0)
                  resolve(base64)
              }
          }
          photo.onerror = (error) => {
              reject(error)                
          }
      })
  }

  // create photo

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(undefined)
  const [message, setMessage] = useState('undefined')
  const [data, setData] = useState({
    ...course,
    site: id
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
    let errorResponse;
    let successResponse;
    let sendBack;

    await modelUpdate(token, data, course.name, photoModel)
      .then(response => {
        if(response.success === false) {
          errorResponse = response.message
        } else {
          successResponse = response.message
          sendBack = response.courses
          console.log(sendBack)
        }
      })
      .catch(error => console.error(error))

    if(profilePic?.image !== course?.image) {
      console.log(profilePic?.image)

      await sendImage(profilePic.image, profilePic.type, photoModel, token, {name: data.name, site: id})
      .then((response) => {
        sendBack = response.sendBack
      })
      .catch(error => console.error(error))
    }

    if (errorResponse) {
      setSuccess(false)
      setLoading(false)
      setError(errorResponse)
    } else if(successResponse) {
      setSuccess(true)
      setLoading(false)
      setMessage(successResponse)
      console.log(sendBack)
      setCourses(sendBack)
      setForm(false)
    }
  }

  const handleChange = name => event => {
    setData({...data, [name]: event.target.value})
    setSuccess(undefined)
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
                    return (
                      <div className="form-group" key={i}>
                        {(() => {
                          if(input.type === 'file') {

                            return (
                              <>
                                <div className="profile-photo" style={profilePic?.image !== undefined ?
                                    {backgroundImage: `url(${profilePic.image})`, marginBottom: 18} : {display: 'none'}
                                }></div>
                                <p className='photoAdd' onClick={() => {
                                    photoButton.current.click()
                                }}>{input.placeholder}</p>
                                <input ref={photoButton} style={{display: 'none'}} type="file" onChange={photo} />                              
                              </>
                            )
                          } else {
                            let indexInput = Object.keys(course).indexOf(input.setInput)
                            let values = Object.values(course)

                            return (
                              <input type="text" defaultValue={indexInput > 0 ? values[indexInput] : ""} onChange={handleChange(input.setInput)} className="form-control" placeholder={input.placeholder} required />
                            )
                          }
                        })()}
                      </div>
                    )
                  })}
                  </Fragment>
                )
              })}
              {/*JSON.stringify(data) */}
              
              <button type="submit" className="btn btn-form">{button}</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Form;