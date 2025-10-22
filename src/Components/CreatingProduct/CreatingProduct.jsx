import { useNavigate } from "react-router-dom"
import "./CreatingProduct.scss"

import { v4 as uuidv4 } from "uuid"

import { useEffect, useRef, useState } from "react"

const CreatingProduct = () => {

  const navigate = useNavigate()

  const [itogo, setItogo] = useState(0)

  const cName = useRef()
  const cAmount = useRef()
  const cPrice = useRef()

  useEffect(() => {
    const calculateItogo = () => {
      const amount = cAmount.current.value || 0
      const price = cPrice.current.value || 0
      setItogo(amount * price)
    }


    cAmount.current?.addEventListener("input", calculateItogo)
    cPrice.current?.addEventListener("input", calculateItogo)


    return () =>{
        cAmount.current?.removeEventListener("input", calculateItogo)
        cPrice.current?.removeEventListener("input", calculateItogo)
    }
  }, [])



  const handelSubmit = async (e) => {
    e.preventDefault()

    const newProduct = {
      id: uuidv4(),
      cName: cName.current.value,
      cAmount: cAmount.current.value,
      cPrice: cPrice.current.value,
      itogo: itogo,
      cDate: new Date().toLocaleDateString("uz-UZ")
    }


    try{
      await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {"Content-Type": "aplication/json"},
        body: JSON.stringify(newProduct)
      })

      navigate("/")
    }catch (err){
      console.error("xato", err)
    }

  }





  return (
    <div className="CreatingProduct">
      <div className="CreatingProduct-main">
        <h2 className="CreatingProduct-main-title">yangi maxsulot malumotlarini kiriting</h2>

        <form onSubmit={handelSubmit} 
        className="CreatingProduct-main-forma">

          <label className="forma-label">
            <span className="forma-label-span">nomi</span>
            <input ref={cName} required
            type="text" className="forma-label-inp" />
          </label>

           <label className="forma-label">
            <span className="forma-label-span">soni</span>
            <input ref={cAmount} required
            type="number" className="forma-label-inp" />
          </label>

           <label className="forma-label">
            <span className="forma-label-span">narxi</span>
            <input ref={cPrice} required
            type="number" className="forma-label-inp" />
          </label>

           <div className="forma-label itogo">
            <p className="itogo-title">itogo</p>
            <p className="itogo-note">{itogo}</p>
          </div>

          <div className="btns">
          <button className="btn" onClick={() => navigate("/")}>bekor qilish</button>
          <button className="btn">saqlash</button>
          </div>


        </form>
      </div>
    </div>
  )
}

export default CreatingProduct
