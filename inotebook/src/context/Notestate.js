import { useState } from 'react'
import NoteContext from './noteContext'

    const NoteState = (props)=>{
    const notesInitial =[
        
    {
        "_id": "69ac82ce60a66cfd8be1d26a",
        "user": "69a73d053c8981cc51291734",
        "title": "my title3",
        "description": "plz wakeup early",
        "tag": "personal",
        "date": "1772913358918",
        "__v": 0
    },
    {
        "_id": "69ae6e9b7340ceddfa1c0ee5",
        "user": "69a73d053c8981cc51291734",
        "title": "my title1",
        "description": "plz wakeup early",
        "date": "1773039259482",
        "__v": 0
    },
    {
        "_id": "69ae6ea17340ceddfa1c0ee7",
        "user": "69a73d053c8981cc51291734",
        "title": "my title12",
        "description": "plz wakeup early",
        "date": "1773039265254",
        "__v": 0
    },
    {
        "_id": "69ae6ea17340ceddfa1c0e2e7",
        "user": "69a73d053c8981cc51291734",
        "title": "my title12",
        "description": "plz wakeup early",
        "date": "1773039265254",
        "__v": 0
    },
    {
        "_id": "69ae6ea17340ceddfa1c0e3e7",
        "user": "69a73d053c8981cc51291734",
        "title": "my title12",
        "description": "plz wakeup early",
        "date": "1773039265254",
        "__v": 0
    },
    {
        "_id": "69ae6ea17340ceddfa1c0e4e7",
        "user": "69a73d053c8981cc51291734",
        "title": "my title12",
        "description": "plz wakeup early",
        "date": "1773039265254",
        "__v": 0
    },
    {
        "_id": "69ae6ea17340ceddfa1c0e5e7",
        "user": "69a73d053c8981cc51291734",
        "title": "my title12",
        "description": "plz wakeup early",
        "date": "1773039265254",
        "__v": 0
    },
    {
        "_id": "69ae6ea17340ceddfa1c0e6e7",
        "user": "69a73d053c8981cc51291734",
        "title": "my title12",
        "description": "plz wakeup early",
        "date": "1773039265254",
        "__v": 0
    }

    ]
    const [notes, setnotes] = useState(notesInitial)

    // Add a Note
    const addNote = (title,description,tag)=>{
        //Todo api call
        console.log("Adding a new note")
        const note = {
        "_id": "69ae6ea17340ceddfa1c0e6e7",
        "user": "69a73d053c8981cc51291734",
        "title": "my title12",
        "description": "plz wakeup early [Added]",
        "date": "1773039265254",
        "__v": 0
    }
        setnotes(notes.concat(note))
    }

    // Delete a Note
    const deleteNote = ()=>{

    }

    //Edit a Note
    const editNote = ()=>{

    }


    return(
        <NoteContext.Provider value = {{notes,addNote,deleteNote,editNote}}>
            {props.children} 
        </NoteContext.Provider>
    )

}
export default NoteState