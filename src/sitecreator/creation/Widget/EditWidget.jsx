import React from 'react';
import './index.scss'
import '../font.scss'

function App({setEdit, setPage, editMode, index, cp, length, navbar}) {

    return (
        <>            
            {
                editMode &&
                <>
                {
                    !navbar &&
                    <>
                    <div className='edit-widget subir fontMode' style={{display: `${index === 0 || index === 1 ? 'none' : 'block'}`}} onClick={() => {
                        setPage(prev => {
                            if(index > 1) {
    
                                let ordering = prev.map((v, i) => {
                                    if(i === 0) {
                                        return ({...v, index: i})
                                    } else if(i === index) {
                                        return ({...v, index: i - 1})
                                    } else if (i === index - 1) {
                                        return ({...v, index: i + 1})
                                    } else {
                                        return ({...v, index: i})
                                    }
                                })
            
                                let sort = [...ordering].sort((a, b) => {
                                    return a.index - b.index
                                }).map(v => {
                                    return ({...v, index: undefined})
                                })
            
                                return (sort)                            
                            } else {
                                return (prev)
                            }
                        })
                    }}>
                        <i className="fa-solid fa-arrow-up"></i>
                    </div>
                    <div className='edit-widget descer fontMode' style={{display: `${index < length - 1 ? 'block' : 'none'}`}} onClick={() => {
                        setPage(prev => {
                            if(1 < index < prev.length - 1) {
                                let ordering = prev.map((v, i) => {
                                    if(i === 0) {
                                        return ({...v, index: i})
                                    } else if(i === index) {
                                        return ({...v, index: `${i + 2 === 0 ? 1 : i + 2}`})
                                    } else if (i === index - 1) {
                                        return ({...v, index: `${i - 2 === 0 ? 1 : i + 2}`})
                                    } else {
                                        return ({...v, index: i})
                                    }
                                })
            
                                let sort = [...ordering].sort((a, b) => {
                                    return a.index - b.index
                                }).map(v => {
                                    return ({...v, index: undefined})
                                })
    
                                return (sort)
                            } else {
                                return (prev)
                            }
                        })
                    }}>
                        <i className="fa-solid fa-arrow-down"></i>
                    </div>
                    </>
                }
                <div className='edit-widget fontMode' onClick={() => setEdit({index, cp})}>
                    <i className="fas fa-edit"></i>
                </div>
                </>
            }
        </>
    );
}
  
export default App;