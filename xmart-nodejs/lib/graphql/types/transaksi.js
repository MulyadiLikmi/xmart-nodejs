import { GraphQLObjectType, GraphQLInputObjectType, GraphQLString, GraphQLID, GraphQLInt } from 'graphql';

import GraphQLDate from 'graphql-date';

const transaksiType = new GraphQLObjectType({
    name : 'Transaksi',
    description : 'Transaksi Type',
    fields : () => ({
        _id : {type : GraphQLID},
        qrCode : {type : GraphQLString},
        rfid : {type : GraphQLString},
        hargaSatuan : {type : GraphQLInt},
        jumlah : {type : GraphQLInt},
        waktuPesan : {type : GraphQLDate}
    })
});

const transaksiInputType = new GraphQLInputObjectType({
    name : 'TransaksiInput',
    description : 'Transaksi Input Type',
    fields : () => ({
        qrCode : {type : GraphQLString},
        rfid : {type : GraphQLString},
        hargaSatuan : {type : GraphQLInt},
        jumlah : {type : GraphQLInt}
    })
});

export {transaksiType, transaksiInputType};