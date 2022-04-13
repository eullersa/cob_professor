import React from 'react';
import './index.scss'
import './font.scss'
import EditTemplate from './EditTemplate/EditTemplate'

function App({edit, setEdit, page, setPage, template}) {

    return (
        <>
        {
            edit &&
            <div className='center fontMode'>
                <div id='createMode'>
                    {
                        <>
                            <EditTemplate templates={template} setEdit={setEdit} edit={edit} setPage={setPage} page={page}  />
                        </>
                    }
                </div>
                <div id='backgroundCreateMode' onClick={() => setEdit(prev => !prev)}></div>
            </div>
        }
        </>
    );
}
  
export default App;