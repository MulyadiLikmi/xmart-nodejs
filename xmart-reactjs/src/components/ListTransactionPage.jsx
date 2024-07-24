import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTransactionsFromMDB } from "../service/service";

const ListTransactionPage = () => {
  const [historyTrx, setHistoryTrx] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistoryTrx();
  }, []);

  const fetchHistoryTrx = async () => {
    try {
      const response = await getTransactionsFromMDB();
      setHistoryTrx(response.data.data.ListTransaksi);
    } catch (error) {
      console.log(error);
    }
  };

  const checkCurrentDate = (date) => {
    const currentDate = new Date(date);
    console.log(currentDate);
  };

  return (
    <div className="w-full h-full grid place-items-center">
      <div className="w-5/6 h-5/6 bg-slate-400 rounded-3xl flex flex-col">
        <h2
          className="text-3xl text-center mb-5"
          onClick={() => getTransactionsFromMDB()}
        >
          Riwayat Transaksi
        </h2>
        <div className="flex-1 overflow-auto p-2">
          <table className="table-auto border border-slate-800 border-collapse mt-5 mx-auto">
            <thead className="border border-slate-800 bg-slate-500 font-bold">
              <tr className="border border-slate-800">
                <td className="p-2 border border-slate-800">QR Code</td>
                <td className="p-2 border border-slate-800">RFID</td>
                <td className="p-2 border border-slate-800">Harga Satuan</td>
                <td className="p-2 border border-slate-800">Jumlah</td>
                <td className="p-2 border border-slate-800">Waktu Pesan</td>
              </tr>
            </thead>
            <tbody className="border border-slate-800">
              {historyTrx.map((item, index) => {
                return (
                  <tr
                    className={`border border-slate-800 ${
                      index % 2 === 0 ? "bg-slate-300" : "bg-slate-200"
                    }`}
                  >
                    <td className="p-2 border border-slate-800">
                      {item.qrCode}
                    </td>
                    <td className="p-2 border border-slate-800">{item.rfid}</td>
                    <td className="p-2 border border-slate-800">
                      Rp{item.hargaSatuan}
                    </td>
                    <td className="p-2 border border-slate-800">
                      {item.jumlah}
                    </td>
                    <td
                      className="p-2 border border-slate-800"
                      onClick={() => checkCurrentDate(item.waktuPesan)}
                    >
                      {Date(item.waktuPesan)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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

export default ListTransactionPage;
