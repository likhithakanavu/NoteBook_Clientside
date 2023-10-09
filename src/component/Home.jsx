
import Navbar from './Navbar'
import Notes from './Notes'
import Alert from './Alert'


export default function Home(props) {
  // const {showAlert} = props

  return (
    <div>
       <Navbar/>
       {/* <Alert alert={alert} /> */}
<div className='container my-3'>
   <Notes  />  
</div>
    </div>
  )
}
