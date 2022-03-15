import StartImage from './../../imgs/starthere/homeoffice.png';

function StartHere({forwardRef}) {

  const toUpperCase = (string) => {
    return string.toUpperCase()
  } 

  return (
    <div id='starthere' ref={forwardRef}>
      <div className='starthere-content'>

        <div className="left">
          <img src={StartImage} alt="StartHere" />
        </div>
          <div className='right'>
            <h6>{toUpperCase('Crie a sua escola virtual')}</h6>
            <h1>Transforme suas ideias em realidade</h1>
            <p>Donec malesuada lectus nec vehicula vulputate. Cras porttitor, lectus sit amet ultrices consequat. Maecenas eget arcu.</p>
            <button className='button'>fale com consultor comercial</button>           
          </div>

      </div>
    </div>
  );
}

export default StartHere;