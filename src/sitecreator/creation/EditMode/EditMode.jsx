import React from 'react';
import './index.scss'
import '../font.scss'

function App({setEditMode, editMode, page}) {

    return (
    <div className='fontMode' id='editmodebutton' style={{position: 'fixed', bottom: 0, right: 0, width: 120, height: 70, zIndex: 879021654789, borderRadius: '25px 0 0 0', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 600, flexDirection: 'column'}}>

        {
            (editMode && page.length !== 0) &&
            <a id="downloadAnchorElem" style={{position: 'absolute', top: 36, right: 20, cursor: 'pointer'}} href="?" onClick={() => {
            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(page));
            var dlAnchorElem = document.getElementById('downloadAnchorElem');
            dlAnchorElem.setAttribute("href",     dataStr     );
            dlAnchorElem.setAttribute("download", "original.json");
            }}> <img src="https://cdn-icons-png.flaticon.com/512/724/724933.png" height={21} alt="download" /></a>
        }

        Modo edição
        <div className='circle' onClick={() => setEditMode(prev => !prev)} style={{transform: 'scale(0.9)',cursor: 'pointer', boxSizing: 'border-box', width: 25, height: 25, background: 'white', borderRadius: "50%", marginTop: 4, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div className='ball' style={{display: `${editMode ? 'block' : 'none'}`,width: 15, height: 15, borderRadius: "50%"}}>
        </div>
        </div>
    </div>
    )
}
  
export default App;