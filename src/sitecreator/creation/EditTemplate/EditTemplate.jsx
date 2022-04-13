import React, { useState, useRef } from 'react';
import './index.scss'
import '../font.scss'

function App({setEdit, edit, setPage, page, templates}) {

    const fields = templates[edit.cp.template].find(v => v.value === edit.cp.component).inputs
    const [answers, setAnswers] = useState(edit.cp)

    // PHOTO

    const [profilePic, setProfilePic] = useState({})

    const photoButton = useRef()
    photoButton.current = []

    const addRefs = (el) => {
        if(el && !photoButton.current?.includes(el)) {
            photoButton.current.push(el)
        }
    }

    const photo = (name, width) => async(e) => {
        let verifyImage = e?.target?.files[0]?.type?.includes('image')
        if(verifyImage) {
            let image = await convertTo64(e.target.files[0], width)
            setProfilePic({...profilePic, [name]: image})
        } else {
            console.error('Isso não é uma imagem')
        }
    }

    const convertTo64 = (file, width) => {

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

    const handleSubmit = async(e) => {
        e.preventDefault()
        let form = [];
        let files = [];
        
        let inps = fields.filter(v => v.value).map((inp, i) => {
            return inp.value
        })

        for (let index = 0; index < e.target.length; index++) {
            if(inps.indexOf(e.target[index].id) > -1) {
                form.push({[e.target[index].id]: e.target[index].value})
            } else {
                let file = await answers[e.target[index]?.id?.replace('-file', '')]
                files.push({[e.target[index].id.replace('-file', '')]: file})
            }
        }

        let inputs = form.reduce((prev, current) => {
            return ({...prev, ...current})
        }, {})

        files = files.reduce((prev, current) => {
            return ({...prev, ...current})
        }, {})

        if(profilePic) {
            inputs = {
                ...inputs,
                ...profilePic
            }
        }

        inputs = {...inputs, template: answers.template, component: answers.component}

        // Verify if some file is empty

        Object.keys(answers).forEach((v, i) => {
            if(inputs[v] === undefined) {
                inputs = {...inputs, [v]: files[v]}
            }
        })

        page[edit.index] = inputs

        setPage([...page])
        setEdit(false)
    }

    return (
        <>
            {
            <div className='fontMode'>
            <form onSubmit={handleSubmit}>
            
            {
            (fields && answers) &&
            fields?.map((inp, i, arr) => {

            if(inp.cut) {

                return (
                    <div key={i} style={{textAlign: 'center', margin: `${i === 0 ? '10px 0 25px 0' : '25px 0'}`, fontWeight: 700}}>
                        {inp.cut}
                    </div>
                )

            }

            else if (inp.type === 'file') {

                let file = arr.filter(v => v.type === 'file').map(v => v.value).indexOf(inp.value)

                return (
                    <div key={i}>
                        <label style={{display: 'block', color: 'black', marginBottom: 6}}>{inp.text} (<span style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => {
                            photoButton.current[file].click()
                        }}>url ou arquivo</span>):</label>
                        
                        {
                            // text
                            Object?.keys(profilePic)?.indexOf(inp.value) === -1 && !answers[inp.value]?.includes('data:image/') &&
                            <input required={inp.required === undefined ? true : inp.required} defaultValue={!answers[inp.value]?.includes('data:image/') ? answers[inp.value] : ''} placeholder={inp?.placeholder} type={'text'} id={inp.value} style={{display: `block`, marginBottom: 12}} />
                        }

                        <input type={inp.type} id={`${inp.value}-file`} ref={addRefs} onChange={photo(inp.value, inp.width)} style={{display: 'none', marginBottom: 12}} />

                        {
                            (Object?.keys(profilePic)?.indexOf(inp.value) > -1 || answers[inp.value]?.includes('data:image/')) &&
                            <div style={{color: 'green', fontWeight: 600, marginBottom: 12}}>Imagem carregada <span style={{color: '#C02A2A', cursor:'pointer'}} onClick={() => {
                                let values = Object.values(profilePic)
                                let keys = Object.keys(profilePic)

                                let map = keys.map((k, i) => {
                                    if(k !== inp.value) {
                                        return ({[k]: values[i]})
                                    } else {
                                        return null
                                    }
                                })

                                let reduce = map.reduce((profilePic, curr) => {
                                    return ({...profilePic, ...curr})
                                }, {})
                                
                                setProfilePic(reduce)
                                setAnswers({...answers, [inp.value]: ''})
                            }}>(Excluir)</span></div>
                        }
                    </div>
                )

            }

            else if (inp.type === 'select') {

                return (
                    <div key={i}>
                        <label style={{display: 'block', color: 'black', marginBottom: 6}}>{inp.text}:</label>
                        <select required={inp.required === undefined ? true : inp.required} defaultValue={answers[inp.value]} style={{width: '100%', marginBottom: 12}} name={inp.value} id={inp.value}>
                            {
                                inp.options.map((opt, i) => {
                                    return (<option key={i} value={opt.value}>{opt.text}</option>)
                                })
                            }
                        </select>
                    </div>
                )

            }

            else {

                return (
                    <div key={i}>
                        <label style={{display: 'block', color: 'black', marginBottom: 6}}>{inp.text}:</label>
                        <input required={inp.required === undefined ? true : inp.required} defaultValue={answers[inp.value]} type={inp.type} id={inp.value} style={{display: 'block', marginBottom: 12}} />
                    </div>
                )

            }
            })
            }
            <button type='submit' className='buttonSubmit button'>Editar</button>
            <button type='button' style={{background: '#C02A2A', cursor: 'pointer'}} className='buttonSubmit button' onClick={() => {
                setPage(prev => {
                    let page = prev.filter((v, i) => i !== edit.index)
                    return (page)
                })
                setEdit(false)
            }}>Deletar</button>
            </form>
            </div>
            }    
        </>
    )
}
  
export default App;