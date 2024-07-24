import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import CustomerDetailPage from "./components/CustomerDetailPage";
import CartPage from "./components/CartPage";
import TransactionDetailPage from "./components/TransactionDetailPage";
import ListTransactionPage from "./components/ListTransactionPage";
import MarketInfoPage from "./components/MarketInfoPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full h-screen bg-slate-300">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/customer-detail" element={<CustomerDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/transaction-detail"
            element={<TransactionDetailPage />}
          />
          <Route path="/transaction-list" element={<ListTransactionPage />} />
          <Route path="/market-info" element={<MarketInfoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
