import noteContext from "../context/noteContext";
import { useContext, useState } from "react";

const AddNote = () => {

  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: ""
  });

  return (
    <div>
      <h2>Add Note</h2>
    </div>
  );
};

export default AddNote;