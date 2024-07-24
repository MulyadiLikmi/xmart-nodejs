import React, { useEffect, useState } from "react";
import { BsCartPlusFill } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
import { IoIosAddCircle, IoIosRemoveCircle, IoIosTrash } from "react-icons/io";
import {
  addToCart,
  increaseItem,
  decreaseItem,
  removeItem,
  clearCart,
} from "../redux/slices/cartSlice";
import { setCustomer, clearCustomer } from "../redux/slices/customerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getItems } from "../service/service";

const CartPage = () => {
  const [listItem, setListItem] = useState([]);
  const [customer, setCustomer] = useState({});
  const carts = useSelector((state) => state.cart);
  const customerSaved = useSelector((state) => state.customer);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(customerSaved).length !== 0) {
      setCustomer(customerSaved);
      getListItem();
    } else {
      alert("Please Input QR Customer first !");
      navigate("/customer-detail");
    }
  }, []);

  const getListItem = async () => {
    try {
      const listItemSaved = await getItems();
      setListItem(listItemSaved.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalPrice = () => {
    if (carts.length === 0) {
      return 0;
    } else {
      let totalPrice = 0;
      carts.forEach((item) => {
        totalPrice = totalPrice + item.hargaSatuan * item.jumlah;
      });
      return totalPrice;
    }
  };

  return (
    <div className="flex flex-row w-full h-full gap-5 p-5">
      <div className="bg-slate-400 rounded-2xl w-2/3 p-5 overflow-auto">
        <button
          className="text-xl p-2 bg-blue-600 rounded-full self-center"
          onClick={() => navigate("/customer-detail")}
        >
          Kembali
        </button>
        <h1 className="text-3xl text-center mb-5">Item List</h1>
        <div className="flex flex-row flex-wrap gap-5">
          {listItem.map((item) => {
            return (
              <Card
                namaBarang={item.namaBarang}
                hargaSatuan={item.hargaSatuan}
                rfid={item.rfid}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col bg-slate-400 rounded-2xl w-1/3 p-5">
        <h1 className="text-3xl text-center mb-5">Cart</h1>
        <div className="flex flex-col flex-1 gap-5 overflow-auto">
          {carts.map((item) => {
            return (
              <CartList
                hargaSatuan={item.hargaSatuan}
                namaBarang={item.namaBarang}
                rfid={item.rfid}
                jumlah={item.jumlah}
              />
            );
          })}
        </div>
        <div className="flex flex-col h-1/4 mt-2 ">
          <h2 className="text-xl">Total Harga : Rp{getTotalPrice()}</h2>
          <h2 className="text-xl">Customer : {customer.nama}</h2>
          <h2 className="text-xl">Wallet : {customer.wallet}</h2>
          {carts.length === 0 ? (
            <div className="text-xl p-2 bg-gray-400 rounded-full self-center">
              Keranjang Kosong
            </div>
          ) : (
            <button
              className="text-xl p-2 bg-blue-600 rounded-full self-center"
              onClick={() => navigate("/transaction-detail")}
            >
              Buat Transaksi
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Card = ({ namaBarang, hargaSatuan, rfid }) => {
  const dispatch = useDispatch();
  return (
    <div className="w-1/5 aspect-square bg-slate-300 rounded-xl flex flex-col items-center p-1">
      <div className="w-2/3 h-2/3 grid place-items-center">
        <FiShoppingBag size={75} />
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col">
          <div className="text-base">{namaBarang}</div>
          <div className="text-base font-bold">Rp{hargaSatuan}</div>
        </div>
        <button
          className="w-10 h-10 bg-slate-400 grid place-items-center rounded-full"
          onClick={() =>
            dispatch(
              addToCart({
                namaBarang: namaBarang,
                hargaSatuan: hargaSatuan,
                rfid: rfid,
              })
            )
          }
        >
          <BsCartPlusFill size={25} />
        </button>
      </div>
    </div>
  );
};

const CartList = ({ namaBarang, hargaSatuan, rfid, jumlah }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-row justify-between items-center bg-slate-300 rounded-xl px-2">
      <div className="flex flex-col">
        <h2 className="text-base">{namaBarang}</h2>
        <h2 className="text-base font-bold">Rp{hargaSatuan * jumlah}</h2>
      </div>
      <div className="flex flex-row">
        <button>
          <IoIosRemoveCircle
            size={30}
            onClick={() => dispatch(decreaseItem(rfid))}
          />
        </button>
        <h3 className="text-xl mx-3">{jumlah}</h3>
        <button>
          <IoIosAddCircle
            size={30}
            onClick={() => dispatch(increaseItem(rfid))}
          />
        </button>
        <button>
          <IoIosTrash
            size={30}
            color="#ff0000"
            onClick={() => dispatch(removeItem(rfid))}
          />
        </button>
      </div>
    </div>
  );
};

export default CartPage;
