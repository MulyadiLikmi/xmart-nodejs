// models/Transaksi.js
const mongoose = require("mongoose");

const transaksiSchema = new mongoose.Schema({
  nama: String,
  namaBarang: String,
  hargaSatuan: Number,
  jumlah: Number,
  waktuPesan: { type: Date, default: Date.now },
});

// Avoid recompiling the model if it already exists
module.exports =
  mongoose.models.Transaksi || mongoose.model("Transaksi", transaksiSchema);
