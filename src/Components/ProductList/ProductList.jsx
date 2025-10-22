import "./ProductList.scss"

import { UseFetch } from "../../Hooks/UseFetch/UseFetch"

const ProductList = () => {

  const {data, isLoading, error} = UseFetch("http://localhost:3000/products")

  if(isLoading) return<p>loading....</p>
  if(error) return <p>xato {error}</p>

  
  const totalAmounts = data.reduce((acc, item) => acc + (Number(item.cAmount) || 0), 0 )
  const totalSums = data.reduce((acc, item) => acc + (Number(item.itogo) || 0), 0)




  return (
    <div className="productList">
      <h2 className="productList-title">maxsulotlar royxati</h2>
      <div className="productList-cards">
    {data && data.map((product) => {
      return(
        <div className="productList-cards-card" key={product.id}>
          
          <p className="productList-cards-card-text">nomi: <br /> <span className="productList-cards-card-text-span">{product.cName}</span> </p>
          <p className="productList-cards-card-text">soni: <br /> <span className="productList-cards-card-text-span">{product.cAmount}</span> </p>
          <p className="productList-cards-card-text">narxi: <br /> <span className="productList-cards-card-text-span">{product.cPrice}</span>  </p>
          
          <p className="productList-cards-card-text">itogo: <br />
            <span className="productList-cards-card-text-span"> {product.itogo}</span>  </p>
         
          <p className="productList-cards-card-text">sana: <br /> 
            <span className="productList-cards-card-text"> {product.cDate}</span> </p>
        </div>
      )
    })}

    <h4>jami maxsulotlar soni: {totalAmounts} ta</h4>
    <h4>jami maxsulotlar summasi: {totalSums}</h4>
    </div>



    </div>
  )
}

export default ProductList