import React from 'react'

const Notesitem = (props) => {
    const {note} = props
  return (
    <div>
        {note.title} : {note.description}

    </div>
  )
}

export default Notesitem