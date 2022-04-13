import React from 'react';
import './index.scss'
import EditWidtget from '../../creation/Widget/EditWidget'

function App({addRefs, setPage, index, cp, setEdit, editMode, length}) {

    return (
        <div id="banner" ref={addRefs} style={{
        backgroundImage: `url("${cp.image ? cp.image : 'black'}")`,
        backgroundColor: `${cp.backgroundColor}`,
        backgroundPosition: 'center', 
        backgroundSize: 'cover',
        position: 'relative'
        }}>
            <EditWidtget setPage={setPage} setEdit={setEdit} editMode={editMode} cp={cp} index={index} length={length} />
            <div className='bannerMenu' style={{height: "100%", width: "100%", position: 'absolute', zIndex: 9}}>
                <div className='bannerMenus' style={cp.formPosition === 'left' ? {flexDirection: 'row-reverse'} : {flexDirection: 'row'}}>
                    <div className="info">
                        {
                            cp.imagemdivertida &&
                            <img src={cp.imagemdivertida} style={{filter: 'brightness(0) invert(1)', height: 50, maxHeight: 50}} alt="logo" />
                        }
                        {
                            cp.title &&
                            <h1>{cp.title}</h1>
                        }
                        {
                            cp.subtitle &&
                            <p>{cp.subtitle}</p>
                        }
                        {
                            cp.cta &&
                            <button className='button' style={{color: `${cp.colorButton ? cp.colorButton : 'black'}`, backgroundColor: cp.buttonColor, borderRadius: `${cp.buttonFormat === 'true' ? '20px' : '0px'}`}}>{cp.cta}</button>
                        }
                    </div>
                </div>
            </div>
            <div style={{height: "100%", width: "100%", background: 'black', opacity: 0.35, position: 'relative'}}>
            </div>            
        </div>
    );
}
  
export default App;