import React from 'react';
import './index.scss'
import './font.scss'

function App({setCreate, page}) {
    return (
        <>
            <div style={page[0]?.template === 'navbars' && page.length === 1 ? {transform: `translateY(110px)`} : {}} onClick={() => setCreate(prev=>!prev)} id='creation' className='fontMode'>
                <i className="fa-solid fa-circle-plus"></i>
            </div>
        </>
    );
}
  
export default App;