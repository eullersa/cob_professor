import Form from './Form'
import { modelCreate } from '../../../../apis/requests'

function CreateSite({setCourses, setForm, name, photoModel, id}) {

  return (
    <div>
        <Form 
          name={name}
          setForm={setForm}
          sendForm={modelCreate}
          setCourses={setCourses}
          photoModel={photoModel}
          id={id}
        />
    </div>
  )
}

export default CreateSite;