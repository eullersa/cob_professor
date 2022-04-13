import DeleteSite from "./DeleteSite";
import "../main.scss"

function MainFormDelete({setForm, setCourses, name, photoModel, id}) {
  return (
    <div id='formTeacher' style={{position: 'fixed'}}>
        <div onClick={() => setForm(false)} style={{height: '100vh', width: '100%', position: 'absolute'}}></div>
        <DeleteSite id={id} name={name} setForm={setForm} setCourses={setCourses} photoModel={photoModel}/>
    </div>
  )
}

export default MainFormDelete;
