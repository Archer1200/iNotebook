import { useState } from 'react'
import NoteContext from './noteContext'
import axios from "axios"

const NoteState = (props)=>{

const host = "http://localhost:5000"

const notesInitial = []
const [notes, setnotes] = useState(notesInitial)


// Get Notes
const getNotes = async ()=>{
    const response = await axios.get(`${host}/api/notes/fetchallnotes`,
        {headers:{
                    "auth-token": localStorage.getItem('token')}
    })
    setnotes(response.data)
}


// Add a Note
const addNote = async (title,description,tag)=>{
    const response = await axios.post(
        `${host}/api/notes/addnotes`,
        {title,description,tag},
        {
            headers:{
                "auth-token": localStorage.getItem('token')
            }
        }
    )

    setnotes(notes.concat(response.data))
}


// Delete a Note
const deleteNote = async (id)=>{

    await axios.delete(`${host}/api/notes/deletenotes/${id}`,{
        headers:{
            "auth-token": localStorage.getItem('token')
        }
    })

    const newNotes = notes.filter((note)=>note._id !== id)
    setnotes(newNotes)
}


// Edit a Note
const editNote = async (id,title,description,tag)=>{
    
    await axios.put(
        `${host}/api/notes/updatenotes/${id}`,
        {title,description,tag},
        {
            headers:{
                "auth-token": localStorage.getItem('token')
            }
        }
    )
    // Update UI 
    // let newtitle = prompt("Title")
    // let newdescription = propmt("description")
    const newNotes = JSON.parse(JSON.stringify(notes))
    
    for(let index = 0; index < newNotes.length; index++){
        
        if(newNotes[index]._id === id){
            
            newNotes[index].title = title
            newNotes[index].description = description
            newNotes[index].tag = tag
            console.log("working")
            
            break
        }
    }

    setnotes(newNotes)
}


return(
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
        {props.children}
    </NoteContext.Provider>
)

}

export default NoteState