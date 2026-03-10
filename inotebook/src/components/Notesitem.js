import React from 'react'

const Notesitem = (props) => {
    const {note} = props
  return (
    
    <div className="col-md-3">
    <div>
        <div className="card" >
        <img src="..." className="card-img-top" alt="..."/>
        <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.description}</p>
        <button type="button" class="btn btn-primary mx-1">Edit</button>
        <button type="button" class="btn btn-primary mx-1">Delete</button>

    </div>
</div>
</div>
    </div>
  )
}

export default Notesitem