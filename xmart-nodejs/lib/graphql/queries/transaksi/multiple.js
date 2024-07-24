import { GraphQLList } from 'graphql';
// const { createClient } = require('redis');
// const redisClient = createClient();
const DEFAULT_EXPIRATION = 3600;

import { transaksiType } from '../../types/transaksi.js';
import TransaksiModel from '../../../models/transaksi.js';
import redisClient from '../../../models/redis.js';

export default {
    type : new GraphQLList(transaksiType),
    async resolve(root, params) {
        const cacheValue = await redisClient.get('list-transaksi');
        if (cacheValue) {
            const dataJSON = JSON.parse(cacheValue);
            dataJSON.map((data) => {
                data.waktuPesan = new Date(data.waktuPesan);
            });
            return dataJSON;
        } else {
            const transaksi = await TransaksiModel.find().lean();
            if (!transaksi) {
                throw new Error('Gagal mendapatkan transaksi');
            }
            redisClient.setEx("list-transaksi", DEFAULT_EXPIRATION, JSON.stringify(transaksi));
            return transaksi;
        }
    }
}