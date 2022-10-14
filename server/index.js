// express server
const express = require('express');

// to work NODE_ENV, require .env extension
require('dotenv').config();

// bring graphQLHTTp
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema/schema');

// create port variable (process.env.PORT --> PORT in environment variable)
const PORT = process.env.PORT || 5000;

const app = express();

app.use('graphql', graphqlHTTP({
    schema,
    // use graphql only in development mode
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(PORT, console.log(`Server running on port ${PORT}`))