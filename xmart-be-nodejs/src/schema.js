// schema.js
const { buildSchema } = require("graphql");
const Transaksi = require("./models/Transaksi");
const { client, getAsync } = require("./redisClient");

const schema = buildSchema(`
  type Transaksi {
    _id: ID!
    qrCode: String!
    rfid: String!
    hargaSatuan: Float!
    jumlah: Int!
    waktuPesan: String!
  }

  type Query {
    getTransaksi(_id: ID!): Transaksi
    listTransaksi: [Transaksi]
  }

  type Mutation {
    addTransaksi(nama: String!, namaBarang: String!, hargaSatuan: Float!, jumlah: Int!): Transaksi
  }
`);

const root = {
  getTransaksi: async ({ id }) => {
    const cachedTransaksi = await getAsync(id);
    if (cachedTransaksi) {
      return JSON.parse(cachedTransaksi);
    }

    const transaksi = await Transaksi.findById(id);
    if (transaksi) {
      client.setex(id, 3600, JSON.stringify(transaksi));
    }
    return transaksi;
  },
  listTransaksi: async () => {
    // In this example, Redis cache is not used for listing. Implement if needed.
    return await Transaksi.find();
  },
  addTransaksi: async ({ nama, namaBarang, hargaSatuan, jumlah }) => {
    const transaksi = new Transaksi({ nama, namaBarang, hargaSatuan, jumlah });
    await transaksi.save();
    client.setex(transaksi.id, 3600, JSON.stringify(transaksi));
    return transaksi;
  },
};

module.exports = { schema, root };
