import "./DailyTrade.scss";

import { UseFetch } from "../../Hooks/UseFetch/UseFetch";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const DailyTrade = () => {
  const { data, isLoading, error } = UseFetch("http://localhost:3000/products");

  if (isLoading) return <p>loading...</p>;
  if (error) return <p>xato {error}</p>;

  const [itogo, setItogo] = useState(0);

  const [getInpValue, setGetInpValue] = useState({
    id: uuidv4(),
    sName: "",
    sAmount: null,
    sPrice: null,
  });

  useEffect(() => {
    const calculateItogo = () => {
      const amount = getInpValue.sAmount || 0;
      const price = getInpValue.sPrice || 0;
      setItogo(amount * price);
    };
    calculateItogo()
  }, [getInpValue.sAmount, getInpValue.sPrice]);

  const handelSubmit = async (e, product) => {
    e.preventDefault();

    const soldAmount = Number(getInpValue.sAmount);
    const soldPrice = Number(getInpValue.sPrice);

    const calculatiAstatk = product.cAmount - soldAmount;

    const calculateProfit =
     ( soldPrice  - product.cPrice ) * soldAmount;

    const upDatingProduct = {
      ...product,
      cAmount: calculatiAstatk,
    };

    const soldProduct = {
      id: uuidv4(),
      sName: product.cName,
      sAmount: getInpValue.sAmount,
      sPrice: getInpValue.sPrice,
      itogo: itogo,
      sProfit: calculateProfit,
      sana: new Date().toLocaleDateString("uz-UZ"),
    };

    try {
      await fetch(`http://localhost:3000/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(upDatingProduct),
      }),
        await fetch(`http://localhost:3000/sales`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(soldProduct),
        });

      alert("sotuv qoshildi");
    } catch (err) {
      console.log("xatolik", err);
    }
  };

  return (
    <div className="dailyTrade">
      <h2 className="dailyTrade-title">kunlik savdolar</h2>
      {data &&
        data.map((product) => {
          return (
            <form
              key={product.id}
              onSubmit={(e) => handelSubmit(e, product)}
              className="dailyTrade-forma"
            >
              <label className="dailyTrade-forma-label">
                <span className="dailyTrade-forma-label-span">nomi:  </span>
                <textarea
                    value={getInpValue.sName || product.cName}
                  type="text"
                  required
                  readOnly
                ></textarea>
              </label>

              <label className="dailyTrade-forma-label">
                <span className="dailyTrade-forma-label-span">soni:</span>
                <input
                  onChange={(e) =>
                    setGetInpValue((prev) => {
                      return { ...prev, sAmount: Number(e.target.value) };
                    })
                  }
                  type="number"
                  placeholder="soni"
                  required
                  className="dailyTrade-forma-label-inp"
                />
              </label>

              <label className="dailyTrade-forma-label">
                <span className="dailyTrade-forma-label-span">narxi:</span>
                <input
                  onChange={(e) =>
                    setGetInpValue((prev) => {
                      return { ...prev, sPrice: Number(e.target.value) };
                    })
                  }
                  type="number"
                  placeholder="narxi"
                  required
                  className="dailyTrade-forma-label-inp"
                />
              </label>

              <p className="dailyTrade-forma-label itogo">
                
                itogo:
                <span>{itogo}</span>
              </p>

              <button className="btn">sell</button>
            </form>
          );
        })}
    </div>
  );
};

export default DailyTrade;
