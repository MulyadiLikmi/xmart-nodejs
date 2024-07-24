const Transaksi = require("./models/Transaksi");
const redisClient = require("redis").createClient();

module.exports = {
  Query: {
    ListTransaksi: async () => {
      const cacheKey = "transaksiList";
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        return JSON.parse(cachedData);
      }

      const data = await Transaksi.find({});
      redisClient.setEx(cacheKey, 3600, JSON.stringify(data));
      return data;
    },
  },
  Mutation: {
    addTransaksi: async (_, { data }) => {
      const newTransaksi = new Transaksi({
        ...data,
        waktuPesan: new Date().toISOString(),
      });
      const savedTransaksi = await newTransaksi.save();

      // Invalidate the cache
      redisClient.del("transaksiList");

      return savedTransaksi;
    },
  },
};
