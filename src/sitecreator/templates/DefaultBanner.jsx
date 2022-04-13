import React from 'react';
import './index.scss'
import EditWidtget from '../../creation/Widget/EditWidget'

function App({setPage, index, cp, setEdit, editMode, length, addRefs}) {

    return (
        <div id='topicsservices' ref={addRefs} style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // Put some picture in background if you want
        }}>
            <EditWidtget setPage={setPage} setEdit={setEdit} editMode={editMode} cp={cp} index={index} length={length} />
            <div style={{maxWidth: 950, width: '100%', padding: '0 20px', boxSizing: 'border-box'}}>

                {/* Code here */}
                
            </div>
        </div>
    );
}

/*

<App addRefs={addRefs} setPage={setPage} index={i} setEdit={setEdit} length={total.length} editMode={editMode} cp={cp} />

*/
  
export default App;