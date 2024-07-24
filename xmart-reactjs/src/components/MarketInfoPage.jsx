import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCustomer,
  getItems,
  getTransactions,
  getTransactionsSplit,
} from "../service/service";

const MarketInfoPage = () => {
  const [activeContent, setActiveContent] = useState("transaction");
  const navigate = useNavigate();

  return (
    <div className="w-full h-full grid place-items-center">
      <div className="w-5/6 h-5/6 bg-slate-400 rounded-3xl flex flex-col mb-5 overflow-auto">
        <div className="flex flex-row justify-evenly items-center">
          <button
            className={`m-2 p-2 self-center bottom-2 rounded-3xl text-3xl text-center 
       ${activeContent === "customer" ? "bg-blue-500" : "bg-blue-300"}`}
            onClick={() => setActiveContent("customer")}
          >
            Customer
          </button>
          <button
            className={`m-2 p-2 self-center bottom-2 rounded-3xl text-3xl text-center 
       ${activeContent === "items" ? "bg-blue-500" : "bg-blue-300"}`}
            onClick={() => setActiveContent("items")}
          >
            Barang
          </button>
          <button
            className={`m-2 p-2 self-center bottom-2 rounded-3xl text-3xl text-center 
       ${activeContent === "transaction" ? "bg-blue-500" : "bg-blue-300"}`}
            onClick={() => setActiveContent("transaction")}
          >
            Transaksi
          </button>
        </div>
        <div className="h-fit p-2 overflow-auto">
          {
            {
              transaction: <TransactionTable />,
              customer: <CustomerTable />,
              items: <ItemsTable />,
            }[activeContent]
          }
        </div>
        <button
          className="m-2 p-2 self-center bottom-2 bg-blue-500 rounded-3xl"
          onClick={() => navigate("/")}
        >
          Kembali ke home
        </button>
      </div>
    </div>
  );
};

const CustomerTable = () => {
  const [listCustomer, setListCustomer] = useState([]);

  useEffect(() => {
    fetchListCustomer();
  }, []);

  const fetchListCustomer = async () => {
    try {
      const response = await getCustomer();
      setListCustomer(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <table className="table-auto border border-slate-800 border-collapse mt-5 mx-auto">
      <thead className="border border-slate-800 bg-slate-500 font-bold">
        <tr className="border border-slate-800" onClick={() => getCustomer()}>
          <td className="p-2 border border-slate-800">Nama Customer</td>
          <td className="p-2 border border-slate-800">Jenis Wallet</td>
          <td className="p-2 border border-slate-800">QR Code</td>
        </tr>
      </thead>
      <tbody className="border border-slate-800">
        {listCustomer.map((item, index) => {
          return (
            <tr
              className={`border border-slate-800 ${
                index % 2 === 0 ? "bg-slate-300" : "bg-slate-200"
              }`}
            >
              <td className="p-2 border border-slate-800">{item.nama}</td>
              <td className="p-2 border border-slate-800">{item.wallet}</td>
              <td className="p-2 border border-slate-800">{item.qrCode}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const TransactionTable = () => {
  const [historyTrxs, setHistoryTrxs] = useState([]);

  useEffect(() => {
    fetchHistoryTrxs();
  }, []);

  const fetchHistoryTrxs = async () => {
    try {
      const response = await getTransactionsSplit();
      setHistoryTrxs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <table className="table-auto border border-slate-800 border-collapse mt-5 mx-auto h-full">
      <thead className="border border-slate-800 bg-slate-500 font-bold">
        <tr className="border border-slate-800">
          <td className="p-2 border border-slate-800">Nama</td>
          <td className="p-2 border border-slate-800">Nama Barang</td>
          <td className="p-2 border border-slate-800">Harga Satuan</td>
          <td className="p-2 border border-slate-800">Jumlah</td>
          <td className="p-2 border border-slate-800">Waktu Pesan</td>
        </tr>
      </thead>
      <tbody className="border border-slate-800">
        {historyTrxs.map((item, index) => {
          return (
            <tr
              className={`border border-slate-800 ${
                index % 2 === 0 ? "bg-slate-300" : "bg-slate-200"
              }`}
            >
              <td className="p-2 border border-slate-800">{item.nama}</td>
              <td className="p-2 border border-slate-800">{item.namaBarang}</td>
              <td className="p-2 border border-slate-800">
                Rp{item.hargaSatuan}
              </td>
              <td className="p-2 border border-slate-800">{item.jumlah}</td>
              <td className="p-2 border border-slate-800">
                {Date(item.waktuPesan)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const ItemsTable = () => {
  const [listItem, setListItem] = useState([]);

  useEffect(() => {
    fetchListItem();
  }, []);

  const fetchListItem = async () => {
    try {
      const response = await getItems();
      setListItem(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <table className="table-auto border border-slate-800 border-collapse mt-5 mx-auto">
      <thead className="border border-slate-800 bg-slate-500 font-bold">
        <tr className="border border-slate-800" onClick={() => getItems()}>
          <td className="p-2 border border-slate-800">Nama Barang</td>
          <td className="p-2 border border-slate-800">Harga Satuan</td>
          <td className="p-2 border border-slate-800">RFID</td>
        </tr>
      </thead>
      <tbody className="border border-slate-800">
        {listItem.map((item, index) => {
          return (
            <tr
              className={`border border-slate-800 ${
                index % 2 === 0 ? "bg-slate-300" : "bg-slate-200"
              }`}
            >
              <td className="p-2 border border-slate-800">{item.namaBarang}</td>
              <td className="p-2 border border-slate-800">
                Rp{item.hargaSatuan}
              </td>
              <td className="p-2 border border-slate-800">{item.rfid}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MarketInfoPage;
