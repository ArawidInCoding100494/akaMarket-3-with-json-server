import { useEffect, useState } from "react"
import "./RootLayOut.scss"

import { NavLink, Outlet } from "react-router-dom"

const RootLayOut = () => {

  const [isfixed, setIsfixed] = useState(false)

  useEffect(() => {
    const handelScrol = () => {
      if(window.scrollY > 50){
        setIsfixed(true)
      }else{
        setIsfixed(false)
      }
    }
    window.addEventListener("scroll", handelScrol)
    return () => window.removeEventListener("scroll", handelScrol)
  }, [])

  return (
    <div className="rootLayOut">
      <header>
      <h1 className="rootLayOut-title">Aka-market-3</h1>
      </header>
      <main>
        <div className="sides">


          <div className={`sides-left ${ isfixed ? "fixed" : ""} `}>
            <nav>
              <NavLink to="/TotalBase" className="btn" >baza</NavLink>
              <NavLink to="/" className="btn">kunlik savdo</NavLink>
              <NavLink to="/DailyLadger" className="btn">kunlik xisobot</NavLink>
            </nav>
          </div>


          <div className="sides-right">
            <Outlet/>
          </div>
        </div>
      </main>
    </div>
  )
}

export default RootLayOut
