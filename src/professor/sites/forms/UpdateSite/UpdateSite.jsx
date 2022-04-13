import Form from './Form'
import { modelCreate } from '../../../../apis/requests'

function CreateSite({setCourses, setForm, course, photoModel, inputs, button}) {

  return (
    <div>
        <Form 
          setForm={setForm}
          button={button}
          sendForm={modelCreate}
          course={course}
          setCourses={setCourses}
          photoModel={photoModel}
          inputs={inputs}

        />
    </div>
  )
}

export default CreateSite;