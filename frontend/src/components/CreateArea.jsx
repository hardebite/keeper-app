import React, { useState } from "react";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });
  const [input,setInput]= useState(false)
  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }
  function clickInput (){
    setInput(true)
  }
  let rows = 1;
  let zoom = false
  return (
    <div>
      <form className="create-note">
      {input ?  <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        /> 
        : null}
       
        <textarea
        onClick={clickInput}
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={input ? 3 :1}
        />
     
        <Zoom in={input}>
        <Fab onClick={submitNote}><AddRoundedIcon/></Fab>
        </Zoom>
        
        
      </form>
    </div>
  );
}

export default CreateArea;
