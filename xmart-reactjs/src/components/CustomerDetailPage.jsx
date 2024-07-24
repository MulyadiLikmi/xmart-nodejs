import React, { useState } from "react";
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";
import QRCode from "react-qr-code";
import { useDispatch, useSelector } from "react-redux";
import { setCustomer, clearCustomer } from "../redux/slices/customerSlice";
import { useNavigate } from "react-router-dom";
import { getCustomerById } from "../service/service";

const CustomerDetailPage = () => {
  const [scanResult, setScanResult] = useState();
  const [customer, setCustomer] = useState();
  const navigate = useNavigate();

  const startScanner = () => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 500,
          height: 500,
        },
        fps: 1,
        disableFlip: false,
        formatsToSupport: [
          Html5QrcodeSupportedFormats.QR_CODE,
          Html5QrcodeSupportedFormats.CODE_128,
        ],
      },
      false
    );
    scanner.render(
      async (result) => {
        const customerExist = await checkCustomer(result);
        if (customerExist) {
          setCustomer({
            nama: customerExist.nama,
            wallet: customerExist.wallet,
            qrCode: customerExist.qrCode,
          });
        } else {
          setCustomer();
        }
        setScanResult(result);
        scanner.clear();
      },
      (error) => {
        console.warn(error);
      }
    );
  };

  const checkCustomer = async (qrResult) => {
    console.log(qrResult);
    const customerExist = await getCustomerById(qrResult);
    if (customerExist) {
      return customerExist.data;
    } else {
      return null;
    }
  };

  return (
    <div className="flex flex-row w-full h-full gap-5 p-5">
      <div className="bg-slate-400 rounded-2xl w-1/2 p-5 flex flex-col items-center">
        <h1 className="text-3xl text-center mb-5">QR Scanner for Customer</h1>
        <div id="reader" className="w-5/6 flex-1"></div>
        <div className="flex flex-row w-full justify-evenly items-center">
          <button
            className="text-xl p-2 bg-blue-600 rounded-full self-center"
            onClick={() => navigate("/")}
          >
            Kembali
          </button>
          <button
            className="text-xl p-2 bg-blue-600 rounded-full self-center"
            onClick={() => startScanner()}
          >
            Start Scanner
          </button>
        </div>
      </div>
      <div className="flex flex-col bg-slate-400 rounded-2xl w-1/2 p-5">
        <h1 className="text-3xl text-center mb-5">Detail Customer</h1>
        {scanResult ? (
          customer ? (
            <CustomerInfoCard customer={customer} />
          ) : (
            <div className="flex-1 grid place-items-center">
              <h2 className="text-xl p-2 bg-red-400 rounded-full self-center">
                Customer with this QR Code is not found, please scan again
              </h2>
            </div>
          )
        ) : (
          <div className="flex-1 grid place-items-center">
            <h2 className="text-xl p-2 bg-green-400 rounded-full self-center">
              Scan QRCode for showing detail customer
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

const CustomerInfoCard = ({ customer }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const startShopping = (customer) => {
    const data = dispatch(setCustomer(customer));
    if (data.payload) {
      navigate("/cart");
    }
  };

  return (
    <div className="flex flex-col flex-1 justify-between items-center">
      <div className="flex flex-col items-center">
        <h2 className="text-xl">QR Code Customer :</h2>
        <h2 className="text-xl font-bold">{customer.qrCode}</h2>
        <QRCode value={customer.qrCode} />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-xl">Nama Customer :</h2>
        <h2 className="text-xl font-bold">{customer.nama}</h2>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-xl">Wallet :</h2>
        <h2 className="text-xl font-bold">{customer.wallet}</h2>
      </div>
      <button
        className="text-xl p-2 bg-blue-600 rounded-full self-center"
        onClick={() => startShopping(customer)}
      >
        Mulai Belanja
      </button>
    </div>
  );
};

export default CustomerDetailPage;
