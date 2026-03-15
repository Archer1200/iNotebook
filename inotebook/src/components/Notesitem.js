import noteContext from "../context/noteContext";
import  { useContext } from "react";
const Notesitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote,editNote} = context
    const {note,updatenote} = props

//     const handleEdit = () => {
//   const newTitle = prompt("Enter new title", note.title);
//   const newDescription = prompt("Enter new description", note.description);

//   if(newTitle && newDescription){
//     editNote(note._id, newTitle, newDescription, note.tag);
//   }
// };






  return (
    
    <div className="col-md-3">
    <div>
        <div className="card" >
        <img src="..." className="card-img-top" alt="..."/>
        <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.description}</p>
        <button type="button" className="btn btn-primary mx-1" onClick={()=>{updatenote(note)}}>Edit</button>
        <button type="button" className="btn btn-primary mx-1" onClick={()=>{deleteNote(note._id);props.showAlert(" Deleted Successfully","success ")}}>Delete</button>

    </div>
</div>
</div>
    </div>
  )
}

export default Notesitem