import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import noteContext from '../contextnotes/NoteContext';

const Noteitem = (props) => {
 const context = useContext(noteContext)
   const {note ,updateNote}= props;
   const {deleteNote}=context;
  return (
    <div className="col-md-3">
      
     
      <div className="card my-3" >

  <div className="card-body">
    <div className='d-flex'>
    <h5 className="card-title">{note.title}</h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <DeleteOutlinedIcon onClick={()=>{deleteNote(note._id)}} />  <EditIcon  onClick={()=>{updateNote(note)}} /> </div>
    <p className="card-text"> {note.description} 
</p> 
</div>
 
</div>

    </div>
  )
}

export default Noteitem
