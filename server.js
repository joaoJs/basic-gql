const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const { makeExecutableSchema } = require("graphql-tools")
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge")
const { loadFilesSync } = require("@graphql-tools/load-files")
const path = require('path');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

// db
const db = async () => {
    try {
        const success = await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('DB Connected');
    } catch (error) {
        console.log('DB Connection Error', error);
    }
};
// execute database connection
db();

// types query / mutation / subscription
const typeDefs = mergeTypeDefs(
    loadFilesSync(path.join(__dirname, "./typeDefs")));


// resolvers 
const resolvers = mergeResolvers(
    loadFilesSync(path.join(__dirname, "./resolvers")));

// gql server
const apolloServer = new ApolloServer({
    typeDefs, 
    resolvers
})

// applyMiddleware method connects ApolloServer to a specific HTTP framework ie: express
apolloServer.applyMiddleware({ app })

const httpserver = http.createServer(app);

app.get('/rest', (req, res) => {
    res.json({
        data: 'hello'
    });
});

app.listen(process.env.PORT, () => {
    console.log(`server listening at port ${process.env.PORT}`);
    console.log(`gql server listening at port ${process.env.PORT}${apolloServer.graphqlPath}`);
});