import React, { useState,useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { redirect } from "react-router-dom";



function App() {
  const [notes, setNotes] = useState([]);
  
  function getData(){
    useEffect(() => {
      async function getRecords() {
        const response = await fetch(`http://localhost:5000/`);
    
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
    
        const records = await response.json();
        // console.log(records)
        records.map((record) =>(
          // console.log(record._id)
          setNotes((prevValue)=>{
            return [...prevValue, {id:record._id,title:record.title,content:record.content}]
          })
        ))
       
      }
      
      getRecords();
    
      return;
    },[]);
  }
  getData()
  async function addNote(notes) {
    const newNote ={ title:notes.title,content:notes.content}
    console.log(newNote);
   await fetch("http://localhost:5000", {
     method: "POST",
     headers: {
       "Content-Type": "application/x-www-form-urlencoded",
     },
     body: new URLSearchParams(newNote),
   })
  //  .then(data => data.redirected && (document.location.href='/'))
   .catch(error => {
     window.alert(error);
     
    //  redirect('/')
     return;
   });
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
    
  }

  async function deleteNote(id) {
    
    const info = {id:id}
    // console.log(info)
    await fetch("http://localhost:5000", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(info),
    })
   //  .then(data => data.redirected && (document.location.href='/'))
    .catch(error => {
      window.alert(error);
      
     //  redirect('/')
      return;
    });
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem) => {
        return noteItem.id !== id;

      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={()=>{
              // console.log(noteItem.id)
              deleteNote(noteItem.id)
            }}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
