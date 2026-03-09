import React, { useContext } from "react";
import noteContext from "../context/noteContext";
import Notesitem from "./Notesitem";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, setnotes } = context;
  return (
    <div className="container my-3">
      <h1>Your Notes</h1>
      {notes.map((notes) => {
        return <Notesitem note={notes} />;
      })}
    </div>
  );
};

export default Notes;
