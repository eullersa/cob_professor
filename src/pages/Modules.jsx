import Menu from '../components/menu/Menu.jsx'
import Footer from '../components/footer/Footer.jsx';
import Dashboard from '../professor/modules/Module.jsx';
import { useState, useEffect } from 'react';
import CForm from '../professor/modules/forms/CreateSite/CForm.jsx';
import DForm from '../professor/modules/forms/DeleteSite/DForm.jsx';
import UForm from '../professor/modules/forms/UpdateSite/UForm.jsx';
import { Authenticated, moduleGetAll } from "../apis/requests";
import { useParams } from 'react-router-dom';

function Home() {

  let { id } = useParams()

  const [form, setForm] = useState(false)
  const [courses, setCourses] = useState([])
  const {token} = Authenticated()

  useEffect(() => {
    document.title = "Cobaye | Crie o seu módulo"
    moduleGetAll(token, id)
          .then(response => {
            if(response?.modules) {
              setCourses(response.modules)
            }
            if(response?.message) {
              setCourses(response)
            }
          })
  }, [token, id])

  // Configurations

  let link = "/module"

  let buttonCreate = "Criar"

  let buttonUpdate = "Atualizar"

  let model = 'class/module'

  let subject = 'módulo'

  let inputsCreate = [{
    label: 'Criar meu módulo *',
    inputs: [
      {
        placeholder: "Nome do módulo",
        setInput: "name",
        type: "text"
      },
      {
        placeholder: "Descrição",
        setInput: "description",
        type: "text"
      }
    ]
  },{
    label: 'Adicionar uma logo',
    inputs: [
      {
        placeholder: "🖼️ Selecionar foto",
        type: "file"
      }
    ]
  }]

  let inputsUpdate = [{
    label: 'Atualizar meu módulo *',
    inputs: [
      {
        placeholder: "Nome do módulo",
        setInput: "name",
        type: "text"
      },
      {
        placeholder: "Descrição",
        setInput: "description",
        type: "text"
      }
    ]
  },{
    label: 'Adicionar uma logo',
    inputs: [
      {
        placeholder: "🖼️ Selecionar foto",
        type: "file"
      }
    ]
  }]

  // Configurations

  return (
    <>
        {
          form?.form === 'create' &&
          <CForm id={id} setForm={setForm} setCourses={setCourses} photoModel={model} inputs={inputsCreate} button={buttonCreate}/>
        }

        {
          form?.form === 'delete' &&
          <DForm id={id} setForm={setForm} name={form?.name} setCourses={setCourses} photoModel={model} />
        }
        
        {
          form?.form === 'update' &&
          <UForm id={id} setForm={setForm} course={form} setCourses={setCourses} photoModel={model} inputs={inputsUpdate} button={buttonUpdate} />
        }

        <Dashboard subject={subject} link={link} setForm={setForm} courses={courses} />
    </>
  )
}

export default Home;
