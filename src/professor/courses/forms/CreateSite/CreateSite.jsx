import Form from './Form'
import { modelCreate } from '../../../../apis/requests'

function CreateSite({setCourses, setForm, photoModel, inputs, button, id}) {

  return (
    <div>
        <Form 
          setForm={setForm}
          button={button}
          sendForm={modelCreate}
          setCourses={setCourses}
          photoModel={photoModel}
          inputs={inputs}
          id={id}
        />
    </div>
  )
}

export default CreateSite;