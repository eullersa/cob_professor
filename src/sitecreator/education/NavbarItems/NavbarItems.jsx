import React, { useEffect, useState } from 'react';
import './index.scss'
import EditWidget from '../../creation/Widget/EditWidget'
import { filterColor } from '../../utils/color'

function MenuBanner({index, cp, setEdit, editMode, divisors, background}) {

    useEffect(() => {
        document.title = cp.title

        return () => {
            document.title = ''
        }
    }, [cp.title])
        
    useEffect(() => {
        document.body.style.fontFamily = cp.font

        return () => {
            document.body.style.fontFamily = ''
        }
    }, [cp.font])

    useEffect(() => {
        let myLink;

        if(cp.link) {
            document.head.querySelectorAll('link.favicon').forEach(e => e.remove())
            myLink = document.createElement('link')
            myLink.rel = 'icon'
            myLink.type = 'image/x-icon'
            myLink.href = cp.link
            myLink.className = 'favicon'
            document.head.appendChild(myLink)
        }

        return () => {
            document.head.removeChild(myLink)
        }
    }, [cp.link])

    const [slide, setSlide] = useState(false)

    const items = [1,2,3]

    return (
        <>
            <div className={`close ${slide ? 'open' : ''}`}>
                <img src="https://cdn-icons-png.flaticon.com/512/2089/2089733.png" alt="close" style={{cursor: 'pointer', height: "auto", maxHeight: '35px', filter: filterColor('#2c2c2c')}} onClick={() => {
                    setSlide(false)
                }} />
            </div>
            <div className={`slidemenu ${slide ? 'open' : ''}`}>
                {
                    items.map((p, i) => {

                        return (
                            <li key={i} style={{cursor: 'pointer'}} onClick={() => {
                                divisors[cp[`reference${i + 1}`] - 1]?.scrollIntoView({behavior: 'smooth'})
                                setSlide(false)
                            }}><span className='rows'>🡢</span>  <span style={{display: 'inline-block', transform: 'translateY(-3px)'}}>{cp[`item${i + 1}`]?.toLowerCase()}</span></li>
                        )

                    })
                }
            </div>
            
            {
                cp.whatsapp &&
                <div id='WhatsApp' style={cp.whatsappposition === 'left' ? {left: 25} : {right: 25}}>
                    <a href={`https://${cp.whatsapp.replace('http://', '').replace('https://', '')}`}><img src="https://cdn-icons-png.flaticon.com/512/5968/5968841.png" alt="WhatsApp" /></a>
                </div>
            }
            <div id="menubanner" style={{position: 'absolute', background: `${background === true ? '#D0DFF4' : ''}`}}>
                <EditWidget setEdit={setEdit} editMode={editMode} cp={cp} index={index} navbar={true} />
                <div className='logo-left'>
                    {
                        cp.logo &&
                        <img src={cp.logo} alt="logo" style={{height: "auto", maxHeight: '60px'}}/>
                    }
                </div>
                <div className='right' style={cp.color ? {color: cp.color} : {color: 'white'}}>
                    <ul style={{gap: `${cp.spacing}px`}}>
                        {
                            items.map((p, i) => {

                                return (
                                    <li key={i} style={{cursor: 'pointer', fontSize: cp.weight}} onClick={() => {
                                        divisors[cp[`reference${i + 1}`] - 1]?.scrollIntoView({behavior: 'smooth'})
                                    }}>{cp[`item${i + 1}`]}</li>
                                )

                            })
                        }
                    </ul>
                </div>
                {
                    cp.center === 'true' &&
                    <div>
                        <img src={cp.logo} alt="logo" style={{visibility: 'hidden', height: "auto", maxHeight: '60px'}}/>
                    </div>
                }
                {
                    cp.center === 'student' &&
                    <a style={{textDecoration:'none'}} href={`${document.referrer}login`} target="_top" ><div className={`buttonAccess`} style={{cursor: 'pointer', padding: '7px 14px', borderRadius: `${cp.buttonFormat === 'true' ? '20px' : '0px'}`, background: cp.buttonColor, color: `${cp.textColor}`}}>
                        {cp.buttonText}
                    </div></a>
                }
                {
                    <div className='menu'>
                        <img onClick={() => setSlide(true)} src={'https://cdn-icons-png.flaticon.com/512/141/141930.png'} alt="logo" style={{height: "auto", maxHeight: '35px', filter: filterColor('#ffffff')}}/>                        
                    </div>
                }
            </div>
        </>
    );
}
  
export default MenuBanner;