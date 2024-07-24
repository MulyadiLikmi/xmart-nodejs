import express, { json } from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import { graphqlHTTP as graphQLHTTP } from 'express-graphql';
// const { createClient } = require('redis');
import schema from './lib/graphql/index.js';

const app = express();
// const redisClient = createClient();
// const DEFAULT_EXPIRATION = 3600;
const port = 3000;
const mongodbURL = 'mongodb://127.0.0.1:27017';

//MongoDB Connection
connect(mongodbURL, {'dbName' : 'XMart'})
.then( result => console.log('***** Connected to MongoDB *****'))
.catch( error => console.log(error));

//Middleware Setup
app.use(json());
app.use(cors());

app.get('/', (req, res, next) => {
    res.send('Hello World');
});

app.use('/graphql', graphQLHTTP({
    schema,
    graphiql : true,
    pretty : true
}));

app.listen(port, ()=> {
    console.log(`GraphQL server running on http://localhost:${port}/graphql`);
});