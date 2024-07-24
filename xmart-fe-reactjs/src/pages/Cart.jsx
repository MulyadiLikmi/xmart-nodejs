import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { GraphQLClient, gql, request } from "graphql-request"; // Import gql and request
import ItemCardLayout from "../components/layouts/ItemCardLayout";
import Basket from "../components/layouts/Basket";

const addTransactionToMDB = async (transaction) => {
  try {
    console.log("QR: " + transaction.qrCode);
    console.log("RFIED: " + transaction.rfid);
    console.log("Harga: " + transaction.hargaSatuan);
    console.log("Jml: " + transaction.jumlah);
    const endpoint = "http://localhost:3000/graphql";
    const graphqlMutation = {
      query: `
          mutation {
              AddTransaksi(
                  data : {
                      qrCode : "${transaction.qrCode}",
                      rfid : "${transaction.rfid}",
                      hargaSatuan : ${transaction.hargaSatuan},
                      jumlah : ${transaction.jumlah}
                  }
              ){
                  _id,
                  qrCode,
                  rfid,
                  hargaSatuan,
                  jumlah,
                  waktuPesan
              }
          }
      `,
    };
    const response = await axios.post(endpoint, graphqlMutation);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

function Cart() {
  // const [addTransaksi] = useMutation(ADD_TRANSAKSI);

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // Use location to get state
  const customerQrCode = location.state?.qrCode; // Retrieve QR code from state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/barang");
        setProducts(response.data); // Assuming response.data is an array of products
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.rfid === product.rfid);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.rfid === product.rfid ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.rfid === product.rfid);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.rfid !== product.rfid));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.rfid === product.rfid ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  // const client = new ApolloClient({
  //   uri: "http://localhost:3000/graphql",
  //   cache: new InMemoryCache(),
  // });

  // const ADD_TRANSAKSI = gql`
  //   mutation AddTransaksi($data: AddTransaksiInput!) {
  //     AddTransaksi(data: $data) {
  //       _id
  //       qrCode
  //       rfid
  //       hargaSatuan
  //       jumlah
  //       waktuPesan
  //     }
  //   }
  // `;

  const handleCheckout = async () => {
    try {
      cartItems.forEach(async (cartItem) => {
        const transaction = {
          qrCode: customerQrCode,
          rfid: cartItem.rfid,
          hargaSatuan: cartItem.hargaSatuan,
          jumlah: cartItem.qty,
        };
        const response = await addTransactionToMDB(transaction);
        console.log(response);
      });
      alert("Transaksi berhasil tersimpan !");
      // dispatch(clearCart())
      // dispatch(clearCustomer())
      navigate("/");
    } catch (error) {
      alert("Transaksi gagal !");
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div className="row">
        <ItemCardLayout items={products} onAdd={onAdd}></ItemCardLayout>
        <Basket
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onCheckout={handleCheckout} // Pass the checkout handler to the Basket component
        ></Basket>
      </div>
    </div>
  );
}

export default Cart;
