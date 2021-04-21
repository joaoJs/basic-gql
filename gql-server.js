const { ApolloServer } = require('apollo-server');
require('dotenv').config();

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

apolloServer.listen(process.env.PORT, () => 
    console.log
        (`gql server listening at port ${process.env.PORT}`));