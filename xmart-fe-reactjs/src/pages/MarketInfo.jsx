import React, { useState } from "react";
import axios from "axios";
import Button from "../components/elements/Button";
import Table from "../components/elements/Table";
import { useNavigate } from "react-router-dom";

const MarketInfo = () => {
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate("/");
  };

  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (endpoint) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/${endpoint}`);
      setData(response.data);
      if (endpoint === "customer") {
        setHeaders(["QR Code", "Nama", "Wallet"]);
      } else if (endpoint === "barang") {
        setHeaders(["RFID", "Nama", "Harga"]);
      } else if (endpoint === "transaksi-split") {
        setHeaders([
          "Transaction ID",
          "Customer",
          "Barang",
          "Harga",
          "Qty",
          "Waktu",
        ]);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h2>Market Info Page</h2>

        <div>
          <Button text="Customer" onClick={() => fetchData("customer")} />
          <Button text="Barang" onClick={() => fetchData("barang")} />
          <Button
            text="Transaction"
            onClick={() => fetchData("transaksi-split")}
          />
        </div>
      </div>
      {loading ? <p>Loading...</p> : <Table data={data} headers={headers} />}
      <Button
        className="button"
        text="Return to home"
        onClick={() => navigate("/")}
      />
    </div>
  );
};

export default MarketInfo;
