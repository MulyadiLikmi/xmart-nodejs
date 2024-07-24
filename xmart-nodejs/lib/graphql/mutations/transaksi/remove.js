import { GraphQLNonNull, GraphQLID } from 'graphql';

import { transaksiType } from '../../types/transaksi.js';
import TransaksiModel from '../../../models/transaksi.js';
import redisClient from '../../../models/redis.js';

export default {
    type : transaksiType,
    args : {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root, params) {
        const removeTransaksi = TransaksiModel.findByIdAndRemove(params.id).exec();
        if (!removeTransaksi) {
            throw new Error('Terjadi kesalahan dalam menghapus transaksi');
        }
        redisClient.del(`transaksi-${params.id}`);
        return removeTransaksi;
    }
}