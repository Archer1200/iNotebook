import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'





export default function Navbar(props) {
  const navigate = useNavigate()

  let location = useLocation()
  
  const Logout=()=>{
    localStorage.removeItem('token')
    navigate("/login")
    props.showAlert("User Loggged Out","success")

  }




  return (
    <>
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/Home">iNoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button> 
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/Home" ? "active": ""} `} aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"? "active" : ""}`} to="/about">About</Link>
        </li>
        
      </ul>
      {!localStorage.getItem('token')?<form className="d-flex" >
        <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
        <Link className="btn btn-primary" to="signup" role="button">Signup</Link>

      </form>: <button onClick={Logout} className="btn btn-primary">Logout</button>}
    </div>
  </div>
</nav>
    
    </>
    
  )
}
