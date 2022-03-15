import BannerImg from './../../imgs/banner/image1.png'

function Banner({childRef}) {

  const titles = [
    {
      text: '50 professores', 
      subtext: 'Maecenas eget arcu at ipsum malesuada ultrices.'
    },
    {
      text: '20 cursos', 
      subtext: 'Donec malesuada lectus nec vehicula vulputate.'
    },
    {
      text: `120 alunos`, 
      subtext: 'Cras porttitor, lectus sit amet ultrices consequat.'
    },
  ]

  const titlesMap = titles.map((title, index) => (
    <div className='titleClass' key={index}>
      <h5><span className='repeatH5'>+ de </span><span className='titleH5'>{title.text}</span></h5>
      <p className="titles">{title.subtext}</p>
    </div>
  ))

  const toUpperCase = (string) => {
    return string.toUpperCase()
  }

  return (
    <div id='banner'>
      <div id='bannerContainer'>
        <div className="rowClass">
          <div id='left'>
            <div className='flexdivs'>
              <h6 className="overText">{toUpperCase('Ensino de qualidade e remoto')}</h6>
              <h1>Ensine de onde estiver no mundo</h1>
              <p>Tenha a sua plataforma com super ferramentas para ensinar seus alunos de uma forma revolucionária.</p>
              
              <div className='buttonTrial'>
                <button className='btn'>falar com consultor</button>
                <div className='tour'>ver nossos planos
                {/*<span className="spanName">Cobaye!</span>*/}
                </div>
              </div>
            </div>
          </div>
          <div id='center'>
            <div className='flexdivs'>
              <img src={BannerImg} className='bannerImg' alt='Imagem Educacional' />
            </div>
          </div>
          <div id='right'>
           <div className='flexdivs'>
            {titlesMap}
           </div>
          </div>
        </div>    
      </div>
      <div style={{cursor: "pointer"}} onClick={() => childRef.current.scrollIntoView({behavior: "smooth"})} className="arrowDown">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 362.96 214.49">
        <path d="M356.83,17.64c-5.26-8.73-13.14-12.63-23.41-12.05c-9.77,0.56-15.91,6.91-22.17,13.17c-0.1,0.1-0.19,0.19-0.29,0.29
          l0.09-0.15c-40.26,40.17-80.68,80.19-120.47,120.81c-2.79,2.85-5.05,4.58-7.17,5.24c-0.02,0.01-0.05,0.01-0.07,0.02
          c-0.3,0.09-0.6,0.16-0.9,0.21c-0.11,0.02-0.23,0.03-0.34,0.04c-0.21,0.02-0.41,0.04-0.62,0.04c-0.21,0-0.41-0.02-0.62-0.04
          c-0.11-0.01-0.22-0.02-0.34-0.04c-0.3-0.05-0.6-0.11-0.9-0.21c-0.02-0.01-0.05-0.01-0.07-0.02c-2.12-0.66-4.38-2.39-7.17-5.24
          l-0.01,0.03c-0.06-0.06-0.12-0.11-0.18-0.17c-39.83-40.59-80.25-80.6-120.48-120.8C45.45,12.5,39.3,6.15,29.54,5.59
          C19.26,5.01,11.39,8.91,6.13,17.64c-5.01,8.32-5.05,16.95,0.33,25.07c2.8,4.22,6.29,8.07,9.89,11.67
          c46.74,46.87,93.54,93.69,140.37,140.48c9.45,9.44,17.09,14.14,24.76,14.1c7.67,0.05,15.31-4.65,24.76-14.1
          c46.83-46.79,93.62-93.6,140.37-140.48c3.59-3.6,7.09-7.45,9.89-11.67C361.88,34.59,361.84,25.96,356.83,17.64z"/>
        </svg>
      </div>
    </div>
  );
}

export default Banner;