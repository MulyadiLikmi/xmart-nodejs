import React, { useState, useEffect } from "react";

const RightPanel = ({ cartItems, customerData, updateCart }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculateTotal = () => {
      return cartItems.reduce(
        (acc, item) => acc + item.hargaSatuan * item.quantity,
        0
      );
    };
    setTotal(calculateTotal());
  }, [cartItems]);

  const handleQuantityChange = (itemId, delta) => {
    updateCart(itemId, delta);
  };

  const handleRemoveItem = (itemId) => {
    updateCart(itemId, 0); // Set quantity to 0 to remove the item
  };

  return (
    <div className="right-panel">
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <span>{item.namaBarang}</span>
            <span>
              {item.quantity} x {item.hargaSatuan} ={" "}
              {item.hargaSatuan * item.quantity}
            </span>
            <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
            <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
            <button onClick={() => handleRemoveItem(item.id)}>🗑️</button>
          </li>
        ))}
      </ul>
      <div className="total">Total Harga: {total}</div>
      {customerData && (
        <div className="customer-info">
          <div>Nama: {customerData.nama}</div>
          <div>Wallet: {customerData.wallet}</div>
        </div>
      )}
    </div>
  );
};

export default RightPanel;
