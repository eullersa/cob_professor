import React from 'react';
import './index.scss'
import './font.scss'
import Template from './SetTemplate/Template'

function App({create, setCreate, page, setPage}) {
    return (
        <>
        {
            create &&
            <div className='center fontMode'>
                <div id='createMode'>
                    {
                        page.length === 0 ?
                        <>
                            <Template setPage={setPage} page={page} setCreate={setCreate} navbar={true} />
                        </> :
                        (
                        
                        page[0].template === 'navbars' ?
                        <>
                            <Template setPage={setPage} page={page} setCreate={setCreate} />
                        </> : 
                        <>
                            <Template setPage={setPage} page={page} setCreate={setCreate} all={true} />
                        </>

                        )
                    }
                </div>
                <div id='backgroundCreateMode' onClick={() => setCreate(prev => !prev)}></div>
            </div>
        }
        </>
    );
}
  
export default App;