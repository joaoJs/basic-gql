const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');

require('dotenv').config();

const app = express();

// types query / mutation / subscription
const typeDefs = `
    type Query {
        totalPosts: Int!
    }
`

// resolvers 
const resolvers = {
    Query: {
        totalPosts: () => 42
    }
}

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