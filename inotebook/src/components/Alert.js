import React from 'react'

export const Alert = (props) => {
  return (
    <>
    <div className="alert alert-primary" role="alert">{props.message} <a href="#" class="alert-link"></a>
</div>
    </>

  )
}
