import UpdateSite from "./UpdateSite";
import "../main.scss"

function MainForm({setForm, setCourses, course, photoModel, inputs, button}) {
  return (
    <div id='formTeacher' style={{position: 'fixed'}}>
        <div onClick={() => setForm(false)} style={{height: '100vh', width: '100%', position: 'absolute'}}></div>
        <UpdateSite setForm={setForm} setCourses={setCourses} course={course} photoModel={photoModel} inputs={inputs} button={button}/>
    </div>
  )
}

export default MainForm;
