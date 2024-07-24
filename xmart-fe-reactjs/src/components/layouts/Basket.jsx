import React from "react";

export default function Basket({ cartItems, onAdd, onRemove, onCheckout }) {
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.hargaSatuan, 0);

  return (
    <aside className="block col-1">
      <h2>Cart Items</h2>
      <div>
        {cartItems.length === 0 && <div>Cart is empty</div>}
        {cartItems.map((item) => (
          <div key={item.rfid} className="row">
            <div className="col-2">{item.namaBarang}</div>
            <div className="col-2">
              <button onClick={() => onRemove(item)} className="remove">
                -
              </button>{" "}
              <button onClick={() => onAdd(item)} className="add">
                +
              </button>
            </div>

            <div className="col-2 text-right">
              {item.qty} x Rp{item.hargaSatuan}
            </div>
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            {/* <hr></hr>
            <div className="row">
              <div className="col-2">Items Price</div>
              <div className="col-1 text-right">Rp{itemsPrice}</div>
            </div> */}

            <div className="row">
              <div className="col-2">
                <strong>Total Price</strong>
              </div>
              <div className="col-1 text-right">
                <strong>Rp{itemsPrice}</strong>
              </div>
            </div>
            <hr />
            <div className="row">
              <button onClick={onCheckout}>Checkout</button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
