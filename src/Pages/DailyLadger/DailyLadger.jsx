import "./DailyLadger.scss"

import { UseFetch } from "../../Hooks/UseFetch/UseFetch"

const DailyLadger = () => {

  const {data: salesData, isLoading: salesLoading, error: salesError} = UseFetch("http://localhost:3000/sales")

  if(salesLoading) return <p>loading....</p>
  if(salesError) return <p>xato {salesError}</p>

  return (
    <div className="DailyLadger">
      <h2 className="DailyLadger-title">kunlik xisobotlar</h2>
      <div className="DailyLadger-cards">
        {salesData && salesData.map((product) => {
          return(
            <div className="DailyLadger-cards-card" key={product.id}>
              <p className="card-text"> 
                <span className="card-text-span">nomi: <br /> {product.sName}</span>
              </p>
              
              <p className="card-text">
                <span className="card-text-span">soni: <br/> {product.sAmount}</span>
              </p>
              <p className="card-text">
                <span className="card-text-span">narxi: <br /> {product.sPrice}</span>
              </p>

              <p className="card-text">
                <span className="card-text-span">itogo: <br /> {product.itogo}</span>
              </p>

              <p className="card-text">
                <span className="card-text-span">foyda:  {product.sProfit}</span>
              </p>

              <h5 className="card-text" >{product.sana}</h5>

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DailyLadger