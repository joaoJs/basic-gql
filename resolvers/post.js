const { gql } = require('apollo-server-express');
const { posts } = require('../temp');
const post = require('../typeDefs/post');
const { Post } = require('../models');

// queries
const totalPosts = () => posts.length;
const allPosts = () => posts;
const postsFromDb = async () => Post.find().select('-__v');

// mutations
const newPost = (_, { input }) => {
    const { title, description } = input
    const newPost = { id: posts.length + 1, title, description }
    posts.push(newPost)
    return newPost
}


module.exports = {
    Query: {
        totalPosts,
        allPosts,
        postsFromDb  
    },

    Mutation: {
        newPost
    }
}