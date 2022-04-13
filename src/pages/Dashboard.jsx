import Menu from '../components/menu/Menu.jsx'
import Footer from '../components/footer/Footer.jsx';
import Dashboard from '../professor/sites/Site.jsx';
import { useState, useEffect } from 'react';
import CForm from '../professor/sites/forms/CreateSite/CForm.jsx';
import DForm from '../professor/sites/forms/DeleteSite/DForm.jsx';
import UForm from '../professor/sites/forms/UpdateSite/UForm.jsx';
import CTheme from '../professor/theme/forms/CreateTheme/CTheme.jsx';
import { Authenticated, siteGetAll } from "../apis/requests";

function Home() {

  const [form, setForm] = useState(false)
  const [courses, setCourses] = useState([])
  const {token} = Authenticated()

  useEffect(() => {
      document.title = "Cobaye | Crie o seu site"
      siteGetAll(token)
          .then(response => setCourses(response.sites))
  }, [token])

  // Configurations

  let link = "/site"

  let buttonCreate = "Criar"

  let buttonUpdate = "Atualizar"

  let model = 'site'

  let subject = 'site'

  let inputsCreate = [{
    label: 'Criar meu site *',
    inputs: [
      {
        placeholder: "Nome do site",
        setInput: "name",
        type: "text"
      },
      /*
      {
        placeholder: "Criar origem",
        setInput: "origin",
        type: "text"
      }
      */
      
    ]
  },
  /*
  {
    label: 'Adicionar uma logo',
    inputs: [
      {
        placeholder: "🖼️ Selecionar foto",
        type: "file"
      }
    ]
  }
  */
  ]

  let inputsUpdate = [{
    label: 'Atualizar meu site *',
    inputs: [
      {
        placeholder: "Nome do site",
        setInput: "name",
        type: "text"
      },
      {
        placeholder: "Criar origem",
        setInput: "origin",
        type: "text"
      }
    ]
  },
  /*
  {
    label: 'Adicionar uma logo',
    inputs: [
      {
        placeholder: "🖼️ Selecionar foto",
        type: "file"
      }
    ]
  }
  */
  ]

  // Configurations


  // Temas

  let buttonTheme = "Selecionar"

  let inputsTheme = [
    {
      label: 'Escolha o tema do seu site',
      inputs: [
        {
          defaultValue: 'green',
          placeholder: "Tema do site",
          setInput: "theme",
          type: "select",
          options: [
            {
              text: 'Verde',
              value: 'green'
            },
            {
              text: 'Azul',
              value: 'blue'
            }
          ]
        }
      ],
    },
  ]

  return (
    <>
        {
          form?.form === 'theme' &&
          <CTheme setForm={setForm} form={form} photoModel={model} inputs={inputsTheme} button={buttonTheme}/>
        }

        {
          form?.form === 'create' &&
          <CForm setForm={setForm} setCourses={setCourses} photoModel={model} inputs={inputsCreate} button={buttonCreate}/>
        }

        {
          form?.form === 'delete' &&
          <DForm setForm={setForm} name={form?.name} setCourses={setCourses} photoModel={model} />
        }
        
        {
          form?.form === 'update' &&
          <UForm setForm={setForm} course={form} setCourses={setCourses} photoModel={model} inputs={inputsUpdate} button={buttonUpdate} />
        }

        <Dashboard subject={subject} link={link} setForm={setForm} courses={courses} />
    </>
  )
}

export default Home;
