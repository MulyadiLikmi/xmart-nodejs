import React from "react";
import shoppingBagImage from "../../assets/shoppingBagImage.png";

export default function ItemCard(props) {
  const { item, onAdd } = props;
  return (
    <div>
      <h3>{item.namaBarang}</h3>
      <img
        className="small"
        src={shoppingBagImage}
        alt={item.namaBarang}
        style={{ width: "70px", height: "70px" }}
      />
      <div>Rp{item.hargaSatuan}</div>
      <div>
        <button onClick={() => onAdd(item)}>Add To Cart</button>
      </div>
    </div>
  );
}
