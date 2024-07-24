import React from "react";
import ItemCard from "../fragments/ItemCard";

export default function ItemCardLayout(props) {
  const { items, onAdd } = props;
  return (
    <main className="block col-2">
      <h2>Items</h2>
      <div className="row">
        {items.map((item) => (
          <ItemCard key={item.rfid} item={item} onAdd={onAdd}></ItemCard>
        ))}
      </div>
    </main>
  );
}
