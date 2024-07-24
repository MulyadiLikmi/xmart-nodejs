import { GraphQLNonNull } from "graphql";
import axios from "axios";

import { transaksiType, transaksiInputType } from "../../types/transaksi.js";
import TransaksiModel from "../../../models/transaksi.js";
import redisClient from "../../../models/redis.js";

const storeTransactions = async (transaction) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/transaksi",
      transaction
    );
    if (response.status === 200) {
      console.log("Data berhasil di store ke postgreSQL");
    }
  } catch (error) {
    console.log(error);
  }
};

export default {
  type: transaksiType,
  args: {
    data: {
      name: "data",
      type: new GraphQLNonNull(transaksiInputType),
    },
  },
  async resolve(root, params) {
    const transaksiModel = new TransaksiModel(params.data);
    const newTransaksi = await transaksiModel.save();
    if (!newTransaksi) {
      throw new Error("Terjadi kesalahan dalam menyimpan transaksi");
    }
    console.log(newTransaksi);
    storeTransactions(newTransaksi);
    redisClient.del("list-transaksi");
    return newTransaksi;
  },
};
