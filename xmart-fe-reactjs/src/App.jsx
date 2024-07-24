import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Shopping from "./pages/Shopping";
import MarketInfo from "./pages/MarketInfo";
import TransactionHistory from "./pages/TransactionHistory";
import Cart from "./pages/Cart";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/market-info" element={<MarketInfo />} />
        <Route path="/transaction-history" element={<TransactionHistory />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;
