import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "./ItemSlice";
import { addItemToCart } from "./CartSlice";

const ItemList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const itemStatus = useSelector((state) => state.items.status);

  useEffect(() => {
    if (itemStatus === "idle") {
      dispatch(fetchItems());
    }
  }, [itemStatus, dispatch]);

  const handleAddToCart = (item) => {
    dispatch(addItemToCart(item));
  };

  return (
    <div className="item-list">
      {items.map((item) => (
        <div key={item.rfid} className="item-card">
          <h3>{item.namaBarang}</h3>
          <p>Rp{item.hargaSatuan}</p>
          <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
