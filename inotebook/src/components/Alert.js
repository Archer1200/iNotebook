import React from 'react'

function Alert(props) {

  
  if(props.alert === null){
    return null
  }

  return (
    <div  style={{
        position: "fixed",
        top: "70px",
        left: "13%",
        transform: "translateX(-50%)",
        zIndex: "1000",
        width: "25%"}}
        
    className={`alert alert-${props.alert.type}`} role="alert">
      {props.alert.msg}
    </div>
  )
}

export default Alert