import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const checkTimeZone = () => {
    let currentDate = new Date(
      new Date().toLocaleString("en", { timeZone: "Asia/Jakarta" })
    );
    let currentDateGlobal = new Date();
    console.log(currentDate);
    console.log(currentDateGlobal);
  };
  return (
    <div
      className="w-full h-full grid place-items-center"
      onClick={() => checkTimeZone()}
    >
      <div className="bg-slate-400 flex flex-col justify-evenly items-center w-72 h-72 rounded-2xl">
        <h1 className="text-3xl">X-Mart</h1>
        <button
          className="bg-slate-300 p-2 rounded-2xl"
          onClick={() => navigate("/customer-detail")}
        >
          Mulai Belanja
        </button>
        <button
          className="bg-slate-300 p-2 rounded-2xl"
          onClick={() => navigate("/market-info")}
        >
          Market Info
        </button>
        <button
          className="bg-slate-300 p-2 rounded-2xl"
          onClick={() => navigate("/transaction-list")}
        >
          Riwayat Transaksi
        </button>
      </div>
    </div>
  );
};

export default HomePage;
