import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";
import { clearCustomer } from "../redux/slices/customerSlice";
import { addTransactionToMDB } from "../service/service";

const TransactionDetailPage = () => {
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState({});
  const cartSaved = useSelector((state) => state.cart);
  const customerSaved = useSelector((state) => state.customer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDataTransaction();
  }, []);

  const getTotalPrice = () => {
    if (cart.length === 0) {
      return 0;
    } else {
      let totalPrice = 0;
      cart.forEach((item) => {
        totalPrice = totalPrice + item.hargaSatuan * item.jumlah;
      });
      return totalPrice;
    }
  };

  const fetchDataTransaction = () => {
    if (Object.keys(customerSaved).length === 0) {
      alert("Please Input QR Customer first !");
      navigate("/customer-detail");
    } else if (cartSaved.length === 0) {
      alert("Keranjang kosong !");
      navigate("/cart");
    } else {
      setCart(cartSaved);
      setCustomer(customerSaved);
    }
  };

  const saveTransaction = async () => {
    console.log(customerSaved);
    console.log(cartSaved);
    try {
      cartSaved.forEach(async (cart) => {
        const transaction = {
          qrCode: customerSaved.qrCode,
          rfid: cart.rfid,
          hargaSatuan: cart.hargaSatuan,
          jumlah: cart.jumlah,
        };
        const response = await addTransactionToMDB(transaction);
        console.log(response);
      });
      alert("Transaksi berhasil tersimpan !");
      dispatch(clearCart());
      dispatch(clearCustomer());
      navigate("/");
    } catch (error) {
      alert("Transaksi gagal !");
      console.log(error);
    }
  };
  return (
    <div className="w-full h-full grid place-items-center">
      <div className="w-1/2 h-5/6 bg-slate-400 rounded-3xl flex flex-col">
        <h2 className="text-3xl text-center mb-5">Detail Transaksi</h2>
        <div className="flex flex-row justify-evenly items-center">
          <div className="flex flex-col justify-between items-start">
            <h2 className="text-lg font-bold">Pembeli : </h2>
            <h2 className="text-lg">{customer.nama}</h2>
          </div>
          <div className="flex flex-col justify-between items-start">
            <h2 className="text-lg font-bold">Wallet : </h2>
            <h2 className="text-lg">{customer.wallet}</h2>
          </div>
          <div className="flex flex-col justify-between items-start">
            <h2 className="text-lg font-bold">Total Bayar : </h2>
            <h2 className="text-lg">Rp{getTotalPrice()}</h2>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <table className="table-auto border border-slate-800 border-collapse mt-5 mx-auto">
            <thead className="border border-slate-800 bg-slate-500 font-bold">
              <tr className="border border-slate-800">
                <td className="p-2 border border-slate-800">Nama Barang</td>
                <td className="p-2 border border-slate-800">Jumlah</td>
                <td className="p-2 border border-slate-800">Harga Satuan</td>
                <td className="p-2 border border-slate-800">Total Harga</td>
              </tr>
            </thead>
            <tbody className="border border-slate-800">
              {cart.map((item, index) => {
                return (
                  <tr
                    className={`border border-slate-800 ${
                      index % 2 === 0 ? "bg-slate-300" : "bg-slate-200"
                    }`}
                  >
                    <td className="p-2 border border-slate-800">
                      {item.namaBarang}
                    </td>
                    <td className="p-2 border border-slate-800">
                      {item.jumlah}
                    </td>
                    <td className="p-2 border border-slate-800">
                      Rp{item.hargaSatuan}
                    </td>
                    <td className="p-2 border border-slate-800">
                      Rp{item.hargaSatuan * item.jumlah}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-row w-full justify-evenly items-center">
          <button
            className="text-xl p-2 bg-blue-600 rounded-full self-center"
            onClick={() => navigate("/cart")}
          >
            Kembali
          </button>
          <button
            className="m-2 p-2 self-center bottom-2 bg-blue-500 rounded-3xl"
            onClick={() => saveTransaction()}
          >
            Simpan Transaksi
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailPage;
