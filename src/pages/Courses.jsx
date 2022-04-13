import Menu from '../components/menu/Menu.jsx'
import Footer from '../components/footer/Footer.jsx';
import Dashboard from '../professor/courses/Course.jsx';
import { useState, useEffect } from 'react';
import CForm from '../professor/courses/forms/CreateSite/CForm.jsx';
import DForm from '../professor/courses/forms/DeleteSite/DForm.jsx';
import UForm from '../professor/courses/forms/UpdateSite/UForm.jsx';
import CPrice from '../professor/prices/forms/CreatePrice/CPrice.jsx';
import CLive from '../professor/live/forms/CreateLive/CLive.jsx';
import { Authenticated, courseGetAll } from "../apis/requests";
import { useParams } from 'react-router-dom';

function Home() {

  let { id } = useParams()

  const [form, setForm] = useState(false)
  const [courses, setCourses] = useState([])
  const {token} = Authenticated()

  useEffect(() => {
    document.title = "Cobaye | Crie o seu curso"
    courseGetAll(token, id)
          .then(response => {
            if(response?.courses) {
              setCourses(response.courses)
            }
            if(response?.message) {
              setCourses(response)
            }
          })
  }, [token, id])

  // Configurations

  let link = "/course"

  let buttonCreate = "Criar"

  let buttonUpdate = "Atualizar"

  let model = 'class/course'

  let subject = 'curso'

  let inputsCreate = [{
    label: 'Criar meu curso *',
    inputs: [
      {
        placeholder: "Nome do curso",
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
    label: 'Atualizar meu curso *',
    inputs: [
      {
        placeholder: "Nome do curso",
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

  // Prices

  let buttonPrice = "Criar"

  let inputsPrices = [{
    label: 'Preço da mensalidade *',
    inputs: [
      {
        placeholder: "Preço da mensalidade",
        setInput: "value",
        type: "number",
        defaultValue: 0,
        min: 1,
      }
    ],
  },{
    label: 'Mês/Meses *',
    inputs: [
      {
        placeholder: "Mensalidade",
        setInput: "months",
        type: "number",
        defaultValue: '1',
        min: 1,
        max: 12,
      }
    ],
  }]

// Configurations

  // Prices

  let buttonLive = "Criar"

  let inputsLive = [
    {
      label: 'URL da aula',
      inputs: [
        {
          placeholder: "URL da aula",
          setInput: "url",
          type: "text",
          defaultValue: ''
        }
      ],
    },
    {
      label: 'Plataforma de live',
      inputs: [
        {
          defaultValue: 'meet',
          placeholder: "Plataforma para live",
          setInput: "type",
          type: "select",
          options: [
            {
              text: 'Google Meet',
              value: 'meet'
            },
            {
              text: 'Zoom',
              value: 'zoom'
            }
          ]
        }
      ],
    },
    /*
    {
      label: 'Duração da aula',
      inputs: [
        {
          placeholder: "Duração da live",
          setInput: "url",
          type: "select",
          options: [
            {
              text: '1 hora',
              value: 1
            },
            {
              text: '2 horas',
              value: 2
            },
            {
              text: '3 horas',
              value: 3
            },
            {
              text: '4 horas',
              value: 4
            },
            {
              text: '5 horas',
              value: 5
            }
          ]
        }
      ],
    },
    */
  ]

  return (
    <>
    
        {
          form?.form === 'live' &&
          <CLive id={id} setForm={setForm} form={form} photoModel={model} inputs={inputsLive} button={buttonLive}/>
        }
    
        {
          form?.form === 'prices' &&
          <CPrice id={id} setForm={setForm} form={form} photoModel={model} inputs={inputsPrices} button={buttonPrice}/>
        }

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
