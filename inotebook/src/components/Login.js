import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const host = "http://localhost:5000";

export default function Login(props) {
    const navigate = useNavigate()
  
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      const response = await axios.post(`${host}/api/auth/login`, {
        email: credentials.email,
        password: credentials.password
      });

      if(response.data.success){
        //save the auth token and redirect
        localStorage.setItem('token',response.data.authtoken)
        navigate("/home")
        props.showAlert("Logged in successfully","success")
      }
      
    
} catch (error) {
    props.showAlert("Invalid Credentials","danger")
      console.log(error.response.data);

    }
  };

  const onChange = (e) => {
    setCredentials({...credentials,[e.target.name]: e.target.value});
  };

  return (
    <>

        <div className="col-md-6 my-4 mx-auto ">
          <h3 className="my-4">Create an account to use iNoteBook</h3>
      <form onSubmit={handleSubmit}>
        <div className=" mb-3 ">
          <label htmlFor="email" className="form-label">Email address</label>
          <input autoComplete="true" type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange}/>
        </div>
        <div className="mb-3"><label htmlFor="password" className="form-label">Password</label>
        <input autoComplete="true" type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange}/>
        </div>
        <div className="text-center">
        <button type="submit" className="btn btn-primary ">Submit</button>
        </div>

      </form>
        </div>
    </>
  );
}