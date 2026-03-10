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
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjlhNzNkMDUzYzg5ODFjYzUxMjkxNzM0In0sImlhdCI6MTc3MjU2Nzg0OX0.PlJVWmBpzap_kL7f4SimfVhGKfIW3SGdQSqQpORUzMk"}
    })
    setnotes(response.data)
}


// Add a Note
const addNote = async (title,description,tag)=>{
    console.log(typeof title, title)
console.log(typeof description, description)

    const response = await axios.post(
        `${host}/api/notes/addnotes`,
        {title,description,tag},
        {
            headers:{
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjlhNzNkMDUzYzg5ODFjYzUxMjkxNzM0In0sImlhdCI6MTc3MjU2Nzg0OX0.PlJVWmBpzap_kL7f4SimfVhGKfIW3SGdQSqQpORUzMk"
            }
        }
    )

    setnotes(notes.concat(response.data))
}


// Delete a Note
const deleteNote = async (id)=>{

    await axios.delete(`${host}/api/notes/deletenotes/${id}`,{
        headers:{
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjlhNzNkMDUzYzg5ODFjYzUxMjkxNzM0In0sImlhdCI6MTc3MjU2Nzg0OX0.PlJVWmBpzap_kL7f4SimfVhGKfIW3SGdQSqQpORUzMk"
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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjlhNzNkMDUzYzg5ODFjYzUxMjkxNzM0In0sImlhdCI6MTc3MjU2Nzg0OX0.PlJVWmBpzap_kL7f4SimfVhGKfIW3SGdQSqQpORUzMk"
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