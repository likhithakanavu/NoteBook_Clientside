import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:4000";

  const notesInitial = [];

  // const s1 = {
  //     "name":"likki",
  //     "class":"4b"
  // }

  // const Update=()=>{
  //     setTimeout(()=>{
  //         setState({

  //                 "name":"lahari",
  //                 "class":"9b"
  //         })
  //     },1000);
  // }

  // const [state, setState] = useState(s1)

  const [notes, setNotes] = useState(notesInitial);

  console.log(notes, "aaaaaaaaaaaaaaaaaaa");




  // Get All notes

  const getNotes = async ()=>{

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type":"application/json",
        "auth-token": localStorage.getItem('token'),
      },
     
    });
    const json = await response.json();
    console.log(json)
    setNotes(json)
  }


  // Add a Notes

  const addNote = async (title, description, tag) => {
    // todo: API Call

      const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({title,description,tag}),
    });
    const note = await response.json();
    console.log(note)


    // const note = json
    setNotes(notes.concat(note));
  };


  // Delete a Note

  const deleteNote = async(id) => {
    // todo: API Call

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type":"application/json",
        "auth-token": localStorage.getItem('token'),
      },
     
    });
    const json = await response.json();
    console.log(json)
    setNotes(json)
  


    console.log("Deleting the note with id : " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a Note

  const editNote = async (id, title, description, tag) => {
    // API Call


    // using fetch web api ...(website)
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'put',
      headers: {
        "Content-Type":"application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json = await response.json();
    console.log(json,"jjjjjjjjjjjsssoonn");

    const newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    console.log(notes);
    setNotes(newNotes);
  };

  return (
    <>
      <NoteContext.Provider value={{ notes, deleteNote, addNote, editNote,getNotes,editNote }}>
        {props.children}
      </NoteContext.Provider>
    </>
  );
};

export default NoteState;
