import { useState, useRef, useEffect } from "react";
import './profile.scss'
import { Authenticated, sendImage } from '../../apis/requests'
import ProfileIcon from '../../imgs/dashboard/profile-icon.png'
import { Link } from "react-router-dom";

function Profile() {

    const [loadingPic, setLoadingPic] = useState(false)
    const photoButton = useRef()
    const { token } = Authenticated()

    const setImageLocalStorage = (data) => {
        if(typeof window !== 'undefined') {
            localStorage.setItem('image', JSON.stringify(data))
        }
    }

    const getImageLocalStorage = () => {
        if(typeof window === 'undefined') {
            return false
        } else {
            if(localStorage.getItem('image')) {
                return JSON.parse(localStorage.getItem('image'))
            } else {
                return false
            }
        }
    }

    const { image } = getImageLocalStorage()
    const { name } = Authenticated()

    useEffect(() => {

        setProfilePic(image)

    }, [image])

    const [profilePic, setProfilePic] = useState(image)
    
    const sendUserImage = async(image, type) => {
        setLoadingPic(true)
        await sendImage(image, type, "user", token)
        .then((response) => {
            setImageLocalStorage(response)
            setProfilePic(image)
        })
        setLoadingPic(false)
    }

    const photo = async(e) => {
        let verifyImage = e?.target?.files[0]?.type?.includes('image')
        if(verifyImage) {
            let image = await convertTo64(e.target.files[0])
            setProfilePic(image)
            await sendUserImage(image, e?.target?.files[0]?.type)
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

    return (
        <div className="centerProfile">
        <div id='profileLink'>
            <div className="profile-photo-button">
                <div style={{position: 'relative'}}>
                    <div style={loadingPic ? {display: 'block'} : {display: 'none'}} className="pic-spinner">
                        <div className="spinner-border text-dark" role="status">
                        </div>
                    </div>
                    <div className="profile-photo" style={loadingPic && profilePic !== undefined ?
                        {opacity: 0.8, backgroundImage: `url(${profilePic})`} : (
                            profilePic === undefined ?
                            {backgroundImage: `url(${ProfileIcon})`, backgroundColor: "white", backgroundSize: "110px", backgroundRepeat: 'no-repeat'}
                            :
                            {backgroundImage: `url(${profilePic})`}
                        )
                    }>
                    </div>
                    <div className="pic-spinner">
                        <div className="spinner-border text-dark" style={{opacity: 0.5}} role="status">
                        </div>
                    </div>
                </div>
                <p onClick={() => {
                    photoButton.current.click()
                }}>Editar foto</p>
                <input ref={photoButton} style={{display: 'none'}} type="file" onChange={photo} />
            </div>

            <div className="informations" style={{paddingTop: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <h6 style={{textAlign: 'center'}}>Olá {name.split(' ')[0]}!</h6>
                <Link style={{textDecoration: 'none'}} to='/dashboard'><p>Alterar nome 😃</p></Link>
                <Link style={{textDecoration: 'none'}} to='/dashboard'><p>Alterar senha 🔑</p></Link>
                <Link style={{textDecoration: 'none'}} to='/dashboard'><p>Deletar conta ❌</p></Link>
            </div>
        </div>
        </div>
    );
}

export default Profile;