import React, { useEffect } from 'react';
import './index.scss'
import EditWidget from '../../creation/Widget/EditWidget'

function NavBar({index, cp, setEdit, editMode, background, phone, color, logo}) {

    useEffect(() => {
        document.title = cp.title
    }, [cp.title])

    
    useEffect(() => {
        document.body.style.fontFamily = cp.font
    }, [cp.font])

    useEffect(() => {
        if(cp.link) {
            document.head.querySelectorAll('link.favicon').forEach(e => e.remove())
            let myLink = document.createElement('link')
            myLink.rel = 'icon'
            myLink.type = 'image/x-icon'
            myLink.href = cp.link
            myLink.className = 'favicon'
            document.head.appendChild(myLink)
        }
    }, [cp.link])

    return (
        <>
        {
            cp.whatsapp &&
            <div id='WhatsApp' style={cp.whatsappposition === 'left' ? {left: 40} : {right: 40}}>
                <a href={`https://${cp.whatsapp.replace('http://', '').replace('https://', '')}`}><img src="https://cdn-icons-png.flaticon.com/512/5968/5968841.png" alt="WhatsApp" /></a>
            </div>
        }
        <div>
            <EditWidget setEdit={setEdit} editMode={editMode} cp={cp} index={index} navbar={true} />
        </div>
        </>
    );
}
  
export default NavBar;