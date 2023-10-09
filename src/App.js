import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Routes,Route } from 'react-router-dom';
import Home from './component/Home';
import About from './component/About';
import NoteState from './contextnotes/Notestate';
import Login from './component/Login';
import Signup from './component/Signup';
import Navbar from './component/Navbar';
import { useState } from 'react';
import Alert from './component/Alert';
function App() {

 

  return (
    <div className="App">
    <NoteState>
    
     <BrowserRouter>
     
     <Routes>
   
     <Route exact path='/' element={<Home   />} />
     <Route exact path='/about' element={<About/>} />
     <Route exact path='/login' element={<Login />} />
     <Route exact path='/signup' element={<Signup />} />

     </Routes>
     
     
     </BrowserRouter>
     </NoteState>
    </div>
  );
}

export default App;
