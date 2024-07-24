import React, { useState, useEffect } from "react";
import { GraphQLClient, gql } from "graphql-request";
import Table from "../components/elements/Table";
import { useNavigate } from "react-router-dom";

const client = new GraphQLClient("http://localhost:3000/graphql");

const TRANSACTION_QUERY = gql`
  query {
    ListTransaksi {
      _id
      qrCode
      rfid
      hargaSatuan
      jumlah
      waktuPesan
    }
  }
`;

const TransactionHistory = () => {
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate("/");
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.request(TRANSACTION_QUERY);
        setData(response.ListTransaksi);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const headers = [
    "ID",
    "QR Code",
    "RFID",
    "Harga Satuan",
    "Jumlah",
    "Waktu Pesan",
  ];

  return (
    <div>
      <h2>Riwayat Transaksi</h2>
      {loading ? <p>Loading...</p> : <Table data={data} headers={headers} />}
      <div>
        <button onClick={handleReturn}>Return to home</button>
      </div>
    </div>
  );
};

export default TransactionHistory;
