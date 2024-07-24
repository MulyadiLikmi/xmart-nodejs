// LeftPanel.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const LeftPanel = ({ onAddToCart }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/barang")
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  return (
    <div className="left-panel">
      <h2>Item List</h2>
      <div className="card-container">
        {items.map((item) => (
          <div key={item.id} className="card">
            <h3>{item.namaBarang}</h3>
            <p>Harga: {item.hargaSatuan}</p>
            <button onClick={() => onAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftPanel;
