import  { useContext, useEffect,useRef,useState} from "react";
import AddNote from "./AddNote";
import noteContext from "../context/noteContext";
import Notesitem from "./Notesitem";
import { useNavigate } from "react-router-dom";


const Notes = (props) => {

const {showAlert}=props
const navigate = useNavigate()
const ref = useRef(null);
const refclose = useRef(null)
const context = useContext(noteContext);
const { notes,getNotes,editNote } = context;
const [note, setNote] = useState({etitle: "",edescription: "",etag: ""});

useEffect(() => {
  if(localStorage.getItem('token')){
    getNotes()  }
    else{
      navigate("/login")
    }
  }
  ,[] )



const updatenote=(currentnote)=>{
    ref.current.click()
    setNote({id:currentnote._id, etitle:currentnote.title, edescription:currentnote.description, etag:currentnote.tag})

}
const handleClick =(e)=>{
    refclose.current.click()
    editNote(note.id, note.etitle, note.edescription, note.etag)
    e.preventDefault()
    props.showAlert("Note is Updated","success")
  }



  const onChange=(e)=>{   
    setNote({...note,[e.target.name]:e.target.value})
  }


  return (
    <>
    <AddNote showAlert={showAlert}/>

<button ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
              <form className="my-3">
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">Title</label>
            <input type="text" className="form-control"  aria-describedby="emailHelp" id="etitle" name="etitle" value={note.etitle} minLength={5} required onChange={onChange}/>
            </div>
          <div className="mb-3">
            <label htmlFor="edesc" className="form-label">Description</label>
            <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} minLength={5} required onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="etag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
          </div>
          
        </form>
      </div>
      <div className="modal-footer">
        <button disabled={note.etitle.length<5 || note.edescription.length<5 } ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
      </div>
    </div>
  </div>
</div>

    <div className="row my-3">
      <h1>Your Notes</h1>
      <div className="container mx-2">
        {notes.length===0 && 'No Notes to Display.'}
      </div>
      {notes.map((note) => {
          return <Notesitem key={note._id} note={note} updatenote={updatenote} showAlert={showAlert} />;
        })}
    </div>
        </>
  );
};

export default Notes;