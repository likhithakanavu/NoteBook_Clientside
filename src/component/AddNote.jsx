import React, { useState,useContext } from "react";
import NoteContext from '../contextnotes/NoteContext';
const AddNote = () => {
    const {addNote} = useContext(NoteContext);
    const [note,setNote]=useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault(); // page reload
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
    }

    const onChange = (e)=>{
        setNote ({...note,[e.target.name]:e.target.value})
    }

  return (
    <div>
      <div className="container my-3">
        <h1>Add Note</h1>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
             Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={5}
              required
              value={note.title}
            />
           
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
             Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              minLength={5}
              required
              value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
             Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              value={note.tag}
            />
          </div>
         
          
          <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleClick} >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
