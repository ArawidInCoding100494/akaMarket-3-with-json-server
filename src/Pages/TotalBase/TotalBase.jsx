import { NavLink, Outlet } from "react-router-dom"
import "./TotalBase.scss"

import React from 'react'

const TotalBase = () => {
  return (
    <div className="totalBase">

      <div className="totalBase-header">
      <h1 className="totalBase-header-title" >yangi maxsulot qoshish</h1>
      <nav>
      <NavLink to="CreatingProduct" className="btn">create</NavLink>
      </nav>
      </div>
      

      <div className="totalBase-main">
        <Outlet/>
      </div>
    </div>
  )
}

export default TotalBase
