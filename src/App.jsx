// from react imports
import { useState } from "react";

// rrd imports
import { Routes, Route } from "react-router-dom";

// style
import "./App.scss";

// hooks
import { UseFetch } from "./Hooks/UseFetch/UseFetch";

// pages
import TotalBase from "./Pages/TotalBase/TotalBase";
import DailyTrade from "./Pages/DailyTrade/DailyTrade";
import DailyLadger from "./Pages/DailyLadger/DailyLadger";

// Components
import CreatingProduct from "./Components/CreatingProduct/CreatingProduct";
import ProductList from "./Components/ProductList/ProductList";

// layOuts
import RootLayOut from "./LayOuts/RootLayOut/RootLayOut";

function App() {
  const [url, setUrl] = useState("http://localhost:3000/products");
  const { data } = UseFetch(url);

  return (
    <Routes>
      <Route element={<RootLayOut />}>
        <Route path="/TotalBase" element={<TotalBase />}>
          <Route path="CreatingProduct" element={<CreatingProduct />} />
          <Route index element={<ProductList />} />
        </Route>

        <Route path="/" element={<DailyTrade />} />
        <Route path="/DailyLadger" element={<DailyLadger />} />
      </Route>
    </Routes>
  );
}

export default App;
