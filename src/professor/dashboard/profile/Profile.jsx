import { useState, useRef } from "react";
import '../profile/profile.scss'
import { Authenticated } from '../../../apis/requests'

function Profile({setCoursesDrop}) {

    const [profilePic, setProfilePic] = useState('')
    const photoButton = useRef()
    const { token } = Authenticated()
    
    const sendImage = async(image) => {
        console.log(image)

        await fetch(`http://localhost:8020/api/v1/photo/create`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({'baby': image})
        })
    }

    const photo = async(e) => {
        let verifyImage = e?.target?.files[0]?.type?.includes('image')
        if(verifyImage) {
            let image = await convertTo64(e.target.files[0])
            setProfilePic(image)
            await sendImage(image)
        } else {
            console.error('Isso não é uma imagem')
        }
    }

    const convertTo64 = (file) => {
        let width = 250

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
        <div id='profile'>
            <span>Olá, Amanda 😀</span>
            {/* Picture Profile */}

            <div className="profile-photo-button">
                <div className="profile-photo" style={{backgroundImage: `url(${profilePic})`}}>
                </div>
                <p onClick={() => {
                    photoButton.current.click()
                }}>Editar foto</p>
                <input ref={photoButton} style={{display: 'none'}} type="file" onChange={photo} />
            </div>
            
            {/* Picture Profile */}

            <div className="informations">
                <h6>Configurações</h6>
                <p>Meus alunos</p>
                <p>Gerenciar sites</p>
                <p>Gerenciar cursos</p>
                <p>Gerenciar lições</p>
                <p>Gerenciar questões</p>
            </div>
        </div>
    );
}

export default Profile;