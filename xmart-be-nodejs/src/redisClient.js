// redisClient.js
const redis = require("redis");
const { promisify } = require("util");

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

client.on("error", (err) => {
  console.error("Redis error:", err);
});

module.exports = { client, getAsync };
