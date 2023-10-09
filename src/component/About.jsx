
import React, { useContext,useEffect } from 'react'
import NoteContext from '../contextnotes/NoteContext'
import Navbar from './Navbar';

const  About=()=> {
    // const a = useContext(NoteContext)
    // useEffect(()=>{
    //     a.Update()
    // },[])
  return (
    <div>
      <Navbar/>
      {/* this is {a.state.name} */}
      this is about page
    </div>
  )
}

export default About;
