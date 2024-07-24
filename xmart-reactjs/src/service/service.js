import axios from "axios";

const getCustomer = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/customer");
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getCustomerById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/customer/${id}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getItems = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/barang");
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getTransactions = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/transaksi");
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getTransactionsSplit = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/transaksi-split"
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getTransactionsFromMDB = async () => {
  try {
    const endpoint = "http://localhost:3000/graphql";
    const graphqlQuery = {
      query: `
                query {
                    ListTransaksi{
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
    const response = await axios.post(endpoint, graphqlQuery);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const addTransactionToMDB = async (transaction) => {
  try {
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

export {
  getCustomer,
  getCustomerById,
  getItems,
  getTransactions,
  getTransactionsFromMDB,
  getTransactionsSplit,
  addTransactionToMDB,
};
