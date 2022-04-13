import CreateSite from "./CreateSite";
import "../main.scss"

function MainForm({setForm, setCourses, photoModel, inputs, button, id}) {
  return (
    <div id='formTeacher' style={{position: 'fixed'}}>
        <div onClick={() => setForm(false)} style={{height: '100vh', width: '100%', position: 'absolute'}}></div>
        <CreateSite id={id} setForm={setForm} setCourses={setCourses} photoModel={photoModel} inputs={inputs} button={button}/>
    </div>
  )
}

export default MainForm;
