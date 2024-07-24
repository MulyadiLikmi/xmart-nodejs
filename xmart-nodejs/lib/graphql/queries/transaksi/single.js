import { GraphQLID, GraphQLNonNull } from 'graphql';

import { transaksiType } from '../../types/transaksi.js';
import TransaksiModel from '../../../models/transaksi.js';
import redisClient from '../../../models/redis.js';

const DEFAULT_EXPIRATION = 3600;

export default {
    type : transaksiType,
    args : {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    async resolve (root, params) {
        const cacheValue = await redisClient.get(`transaksi-${params.id}`);
        if (cacheValue) {
            const dataJSON = JSON.parse(cacheValue);
            dataJSON.waktuPesan = new Date(dataJSON.waktuPesan);
            return dataJSON;
        } else {
            const transaksi = await TransaksiModel.findById(params.id).lean();
            if (!transaksi) {
                throw new Error(`Gagal mendapatkan transaksi dengan id ${params.id}`);
            }
            redisClient.setEx(`transaksi-${params.id}`, DEFAULT_EXPIRATION, JSON.stringify(transaksi));
            return transaksi;
        }
    }
}