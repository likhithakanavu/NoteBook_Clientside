import React, { useState } from "react";
// import { useHistory } from 'react-router-dom';
import { useNavigate,Link } from "react-router-dom";

const Login = (props) => {
  const host = "http://localhost:4000";
  const navigate = useNavigate();
  const [credential, setCredential] = useState({ email: "", password: "" });
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    // alert("hi")
    e.preventDefault();

    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
        // save the auth token and redirect

        localStorage.setItem('token',json.authtoken);
        alert("Logged in Successfully","Success")
        navigate('/')
        
    }else{
      alert("Invalid Details","danger")
    }
  };

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-5 my-3">
      <h3>Login to Continue to INotebook</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credential.email}
            aria-describedby="emailHelp"
            onChange={onChange}
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
            value={credential.password}
            name="password"
            className="form-control"
            id="password"
            onChange={onChange}
            minLength={5}
            required
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
      <h5>Don`t have Account Register now <Link to='/signup'>SignUp</Link></h5>
    </div>
  );
};

export default Login;
