import { Fragment, useRef, useState } from 'react';

function Live({text, platform}) {

  // document.documentElement.style.setProperty('--colorText', 'red');

  const [copied, setCopied] = useState('Copiar link')

  const copyText = () => {
    navigator?.clipboard?.writeText(link.current.innerHTML)
    setCopied('Copiado!')
  }

  const clickLink = () => {
    const linkPlatform = `${link.current.innerHTML}`
    window.location.href = linkPlatform
  }

  const link = useRef(null)

  return (
    <Fragment>
      <div id='live'>
        <span className='text'>{text}</span>
        <div className='link'>
          {
            platform === 'googleMeet' &&
            <div className='platform'>
              <img src='https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v1/web-96dp/logo_meet_2020q4_color_2x_web_96dp.png' alt='Google Meet'/>
              <span>Clique no link para participar da chamada</span>
              <div className='copyLink'>
                <div className="fas fa-link"></div>
                <div onClick={() => clickLink()} style={{cursor: 'pointer'}} className='linkPlatform' ref={link}>
                  https://meet.google.com
                </div>
                <div className='copy'>
                  <div className={copied === 'Copiado!' ? 'copyMessage copied' : 'copyMessage'}>{copied}</div>
                  <div style={{cursor: 'pointer'}} onClick={() => copyText()} className="fas fa-copy"></div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </Fragment>
  );
}

export default Live;