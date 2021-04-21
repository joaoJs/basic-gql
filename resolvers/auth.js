const { gql } = require('apollo-server-express');

const me = () => 'Joao'


module.exports = {
    Query: {
        me
    }
}