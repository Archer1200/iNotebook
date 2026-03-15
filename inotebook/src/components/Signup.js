import React, { useState } from 'react'
import axios from 'axios';import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
  
const navigate = useNavigate()
const host = "http://localhost:5000";
const [cred, setcred] = useState({
  name:"",email:"",password:""
})

 
 const onSubmit=async(e)=>{
  try {
    e.preventDefault()
    const response = await axios.post(`${host}/api/auth/createuser`,{
      name:cred.name,email:cred.email,password:cred.password
    })
    console.log(response.data)
    if(response.data.success){
      localStorage.setItem('token',response.data.authtoken)
      navigate("/home")
      props.showAlert("Account Created successfully","success")

    }
  
  } catch (error) {
    props.showAlert("Invalid Credentials","danger")

  }
  }

  const onChange =(e)=>{
    setcred({...cred,[e.target.name]: e.target.value})
  }



  return (
   <form onSubmit={onSubmit}>
     <div className="col-md-6 my-4 mx-auto">

              

  <div className="mb-3 ">
    <label htmlFor="name" className="form-label">Full Name</label>
    <input type="name" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={cred.name} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"value={cred.email} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={cred.password} onChange={onChange} minLength={5} required/>
  </div>
  <div className="text-center">
  <button type="submit" className="btn btn-primary">Submit</button>
  </div>
            </div>
</form>
  )
}
