import React from 'react'
import { useLocation } from 'react-router-dom'
import "./confirm.style.css"

const ConfirmPage = () => {
    const location = useLocation();
     const arr = location.search.split("&");
    let arr2 = arr.map((elem,i)=>{
      return elem.split("=")[1];
    })

  return (
    <div className='confirm'>
            <h2>Congratulation your response has been recorded</h2>
            <h5>Details:-</h5>
            <div id="detail_box">
                 <p><b>Name:- {arr2[0]} </b></p>
                 <p><b>Email:- {arr2[1]}  </b></p>
                 <p><b>Mobile:- {arr2[2]}</b></p>
            </div>
    </div>
  )
}

export default ConfirmPage