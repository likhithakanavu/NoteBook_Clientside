import React ,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const  Navigate = useNavigate()
  const [credential, setCredential] = useState({ name:"", email: "", password: "" });

    const handleSubmit = async (e) => {

   
        // alert("hi")

        e.preventDefault();
        const {name, email, password}=credential;
        const response = await fetch("http://localhost:4000/api/auth/createuser", {
          
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password
          }),
        });
        const json = await response.json();
        console.log(json);
        if(json.success){

        
            // save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            Navigate('/login')
            alert("Account Created Successfully","Success")
        }else{
          alert("invalid credential","danger")
      };
    }
    
      const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
      };

  return (
    <div className='container mt-5 my-3'>
       <h3 >Create an account to use INotebook</h3>
    <form>
    <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            aria-describedby="emailHelp"
            
          />
          
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
            
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={onChange}
            name="password"
            className="form-control"
            id="password"
            required
            minLength={5}
           
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
           confirm password
          </label>
          <input
            type="password"
            onChange={onChange}
            name="cpassword"
            className="form-control"
            id="cpassword"
            minLength={5}
           
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      
      </form>
      <h5>Already have Account  <Link to='/login'>SignIn</Link> Now</h5>
    </div>
  )
}

export default Signup
