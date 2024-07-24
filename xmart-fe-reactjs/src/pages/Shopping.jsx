import React, { useState, useRef } from "react";
import axios from "axios";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Button from "../components/elements/Button";
import "./Shopping.css";

const Shopping = () => {
  const [scanOptionsVisible, setScanOptionsVisible] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const [message, setMessage] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [uploadedQrCodeImage, setUploadedQrCodeImage] = useState(null);
  const qrCodeScannerRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleStartScanner = () => {
    setScanOptionsVisible(true);
  };

  const handleScan = async (qrCode, uploadedImage = null) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/customer?qrCode=${qrCode}`
      );
      if (response.data.length === 0) {
        setMessage("Customer not found");
        setCustomerData(null);
        setUploadedQrCodeImage(null);
      } else {
        setMessage("");
        setCustomerData(response.data[0]);
        setUploadedQrCodeImage(uploadedImage);
      }
    } catch (error) {
      console.error("Error fetching customer data", error);
      setMessage("Error fetching customer data");
      setCustomerData(null);
      setUploadedQrCodeImage(null);
    }
  };

  const startCameraScan = () => {
    if (!isScanning) {
      const html5QrCode = new Html5Qrcode("reader");
      qrCodeScannerRef.current = html5QrCode;

      html5QrCode
        .start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (qrCodeMessage) => {
            handleScan(qrCodeMessage);
            html5QrCode.stop();
            setIsScanning(false);
          },
          (errorMessage) => {
            console.error("QR Code scan error", errorMessage);
          }
        )
        .catch((err) => {
          console.error("Unable to start scanning", err);
        });

      setIsScanning(true);
    }
  };

  const uploadQrCode = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const html5QrCode = new Html5Qrcode("reader");
      try {
        const qrCodeMessage = await html5QrCode.scanFile(file, true);
        handleScan(qrCodeMessage, URL.createObjectURL(file));
      } catch (err) {
        console.error("QR Code scan error", err);
        setMessage("QR Code not found");
        setCustomerData(null);
        setUploadedQrCodeImage(null);
      }
    }
  };

  const handleReturn = () => {
    setScanOptionsVisible(false);
    setCustomerData(null);
    setMessage("");
    setUploadedQrCodeImage(null);
    if (qrCodeScannerRef.current) {
      qrCodeScannerRef.current
        .stop()
        .catch((err) => console.error("Error stopping QR code scanner", err));
    }
    navigate("/");
  };

  const goToCart = () => {
    navigate("/cart", { state: { qrCode: customerData.qrCode } });
  };

  return (
    <div className="shopping-page">
      <div className="left-panel">
        <h2 className="title">QR Scanner</h2>
        <div id="reader"></div>
        <div className="buttons">
          {scanOptionsVisible ? (
            <>
              <Button text="Scan with Camera" onClick={startCameraScan} />
              <Button
                text="Upload QR Code"
                onClick={() =>
                  document.getElementById("qr-code-upload").click()
                }
              />
              <input
                type="file"
                id="qr-code-upload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={uploadQrCode}
              />
            </>
          ) : (
            <Button text="Start Scanner" onClick={handleStartScanner} />
          )}
          <Button text="Return" onClick={handleReturn} />
        </div>
      </div>
      <div className="right-panel">
        <h2 className="title">Customer Detail</h2>
        {message && <p>{message}</p>}
        {customerData && (
          <div>
            <p>QR Code: {customerData.qrCode}</p>
            {uploadedQrCodeImage && (
              <img
                src={uploadedQrCodeImage}
                alt="Uploaded QR Code"
                style={{ width: "200px" }}
              />
            )}
            <p>Nama: {customerData.nama}</p>
            <p>Wallet: {customerData.wallet}</p>
            {customerData.qrCode && (
              <button onClick={goToCart} className="go-to-cart-button">
                Go to Cart
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shopping;
