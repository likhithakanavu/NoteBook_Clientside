import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

  const Navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    Navigate('/login')
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-black">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/about">
                  About
                </Link>
              </li>
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  
                </ul>
              </li> */}
            </ul>
            {!localStorage.getItem('token') ? <form className="d-flex" role="search">
              <Link to="/login" className="btn btn-primary mx-1" role="button">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary mx-1" type="button">
                SignUp
              </Link>
            </form>:<button onClick={handleLogout} className="btn btn-primary">Logout</button>}
          </div>
        </div>
      </nav>
    </div>
  );
}
