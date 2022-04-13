// Menu

import MenuCobaye from '../components/creatorMenu/Menu.jsx'

// Templates

import NavbarItems from './education/NavbarItems/NavbarItems.jsx'
import Banner from './education/Banner/Banner.jsx'

// Configurations

import Creation from './creation/CreateButton'
import CreateMode from './creation/CreateMode'
import EditModeButton from './creation/EditMode/EditMode'
import EditMode from './creation/EditMode'
import './App.scss'
import { Fragment, useState, useRef, useEffect } from 'react'
import { templates } from './templates/templates';
import { original } from './original/original.js'
import { useParams } from 'react-router-dom'
import { siteTemplateGet } from '../apis/requests.js'

function App({disable}) {

  const [create, setCreate] = useState(false)
  const [edit, setEdit] = useState(false)
  const [page, setPage] = useState(original)
  const currentTemplates = templates
  const refPages = useRef(null)
  const { id } = useParams()
  refPages.current = []

  useEffect(() => {
    siteTemplateGet(id)
    .then(response => {
      if(response.lp) {
        setPage(response.lp)
      } else {
        setPage([])
      }
    })
    .catch(() => {
      setPage([])
    })
  }, [])

  const addRefs = (el) => {
    if(el && !refPages.current.includes(el)) {
      refPages.current.push(el)
    }
  }

  // SET TO FALSE TO BUILD
  const [editMode, setEditMode] = useState(disable)
  const modo = disable
  // SET TO FALSE TO BUILD

  const pagetest = {}

  return (
    <>

      {
        (!disable && page.length === 0) &&
        <div style={{zIndex: -1, position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
          <div class="spinner-border"  role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      }

      {
        modo &&
        <>
        <MenuCobaye items={[
        ]} courses={false} links={[
          {name: 'preview', link: `/site/preview/${id}`, type: 'text'},
          {name: 'salvar', link: 'creator', type: 'button', data: page, id: id},
        ]} />

        <div className='spaceContent'></div>
        </>
      }
      <div id='page-view'>
      {
        edit &&
        <EditMode template={currentTemplates} edit={edit} setEdit={setEdit} page={page} setPage={setPage} />
      }

      {
        create &&
        <CreateMode create={create} setCreate={setCreate} page={page} setPage={setPage} />
      }

      {
        modo &&
        <EditModeButton setEditMode={setEditMode} editMode={editMode} page={page} />   
      }

      <div id='page-creation'>
      {
        page?.map((cp, i, total) => {
          if(cp.component === 'NavbarItems') {
            let cptotal = total?.length

            return (
              <Fragment key={i}>
                <NavbarItems cp={cp} index={i} setEdit={setEdit} divisors={refPages.current} editMode={editMode} background={cptotal === 1 ? true : false} />
              </Fragment>
            )
          } else if (cp.component === 'Banner') {
            return (
              <Fragment key={i}>
                <Banner addRefs={addRefs} setPage={setPage} index={i} cp={cp} setEdit={setEdit} length={total.length} editMode={editMode} />
              </Fragment>
            )
          } else {
            return null
          }
        })
      }

      {/* Test Area */}

        {/*<TopicsServices cp={pagetest} />*/}
      
      {/* Test Area */}

      </div>

      {
        editMode &&
        <Creation create={create} page={page} setCreate={setCreate} />
      }

    </div>
    
    </>
  );
}

export default App;
