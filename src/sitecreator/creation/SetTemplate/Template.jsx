import React, { useState, useRef } from 'react';
import './index.scss'
import '../font.scss'
import { templates } from '../../templates/templates';

function App({setPage, setCreate, page, navbar, all}) {

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [temp, setTemp] = useState()
    const [mod, setMod] = useState()
    const [inputs, setInputs] = useState()
    const [example, setExample] = useState()
    let modifyTemplates = templates

    if (navbar === true) {
        modifyTemplates = {navbars: modifyTemplates.navbars}
    } else if (all === true) {
        modifyTemplates = templates
    } else {
        modifyTemplates = Object.keys(templates).map((v, i) => ({[v]: Object.values(templates)[i]})).filter(v => !v.navbars)
        modifyTemplates = modifyTemplates.reduce((prev, curr) => {
            return ({...prev, ...curr})
        }, {})
    }

    // PHOTO

    // create photo
    const [profilePic, setProfilePic] = useState({})

    const photoButton = useRef()
    photoButton.current = []

    const addRefs = (el) => {
        if(el && !photoButton.current.includes(el)) {
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

    const handleSubmit = (e) => {
        e.preventDefault()
        let form = [];
        
        let inps = inputs.filter(v => v.value).map((inp, i) => {
            return inp.value
        })

        for (let index = 0; index < e.target.length; index++) {
            if(inps.indexOf(e.target[index].id) > -1) {
                form.push({[e.target[index].id]: e.target[index].value})
            }
        }

        let values = form.reduce((prev, current) => {
            return ({...prev, ...current})
        }, {})

        if(profilePic) {
            values = {
                ...values,
                ...profilePic
            }
        }

        if(temp.toLowerCase() === 'navbars') {
            console.log([{...mod, ...values, template: temp.toLowerCase()}, ...page])
            setPage([{...mod, ...values, template: temp.toLowerCase()}, ...page])            
        } else {
            setPage([...page, {...mod, ...values, template: temp.toLowerCase()}])
        }

        setCreate(false)
    }

    return (
        <>
            {
                temp === undefined &&
                <div className='models fontMode'>
                    {
                        Object.keys(modifyTemplates).map(v => capitalizeFirstLetter(v)).map((temp, i) => {
                            return (
                                <div className="model" key={i} onClick={() => {
                                    setTemp(temp)
                                }}>{temp}</div>
                            )
                        })
                    }
                </div>
            }
            {
                (temp && inputs === undefined && mod === undefined) &&
                <div className='models fontMode'>
                    {
                        modifyTemplates[temp.toLowerCase()].map((te, i) => {
                            return (
                                <div className="model" key={i} onClick={() => {
                                    setMod({component: te.value})
                                    setExample(te.example)
                                    setInputs(te.inputs)
                                }}>{te.text}</div>
                            )
                        })
                    }
                </div>
            }   
            {
            (temp && inputs && mod) &&
            <div>
            <form onSubmit={handleSubmit}>
            {
            inputs.map((inp, i, arr) => {

            if(inp.cut) {

                return (
                    <div className='fontMode' key={i} style={{textAlign: 'center', margin: `${i === 0 ? '10px 0 25px 0' : '25px 0'}`, fontWeight: 700}}>
                        {inp.cut}
                    </div>
                )

            }

            else if (inp.type === 'file') {

                let file = arr.filter(v => v.type === 'file').map(v => v.value).indexOf(inp.value)

                return (
                    <div className='fontMode' key={i}>
                        <label style={{display: 'block', color: 'black', marginBottom: 6}}>{inp.text} (<span style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => {
                            photoButton.current[file].click()
                        }}>ou arquivo</span>):</label>
                        
                        {
                            Object?.keys(profilePic)?.indexOf(inp.value) === -1 &&
                            <input required={inp.required === undefined ? true : inp.required} placeholder={inp?.placeholder} type={'text'} id={inp.value} style={{display: 'block', marginBottom: 12}} />
                        }

                        <input type={inp.type} id={`${inp.value}-file`} ref={addRefs} onChange={photo(inp.value, inp.width)} style={{display: 'none', marginBottom: 12}} />

                        {
                            Object?.keys(profilePic)?.indexOf(inp.value) > -1 &&
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
                            }}>(Excluir)</span></div>
                        }
                    </div>
                )

            }

            else if (inp.type === 'select') {

                return (
                    <div className='fontMode' key={i}>
                        <label style={{display: 'block', color: 'black', marginBottom: 6}}>{inp.text}:</label>
                        <select required={inp.required === undefined ? true : inp.required} style={{width: '100%', marginBottom: 12}} name={inp.value} id={inp.value}>
                            {
                                inp.options.map((opt, i) => {
                                   return (<option key={i} value={opt.value}>{opt.text}</option>)
                                })
                            }
                        </select>
                    </div>
                )

            } else if (inp.type === 'add') {

                return (
                    <div className='fontMode' key={i}>
                        <label style={{display: 'block', color: 'black', marginBottom: 6}}>{inp.text}:</label>
                        <input type={inp.type} id={inp.value} style={{display: 'block', marginBottom: 12}} required={inp.required === undefined ? true : inp.required} />
                    </div>
                )

            }

            else {

                return (
                    <div className='fontMode' key={i}>
                        <label style={{display: 'block', color: 'black', marginBottom: 6}}>{inp.text}:</label>
                        <input type={inp.type} id={inp.value} style={{display: 'block', marginBottom: 12}} required={inp.required === undefined ? true : inp.required} />
                    </div>
                )

            }
            })
            }
            <button type='submit' className='buttonSubmit button fontMode'>Criar</button>
            <button type='button' className='buttonSubmit button example fontMode' onClick={() => {
                if(example.template === 'navbars') {
                    setPage([example, ...page])
                } else {
                    setPage([...page, example])
                }
                setCreate(false)
            }}>Exemplo</button>
            </form>
            </div>
            }    
        </>
    )
}
  
export default App;