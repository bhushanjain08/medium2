const express = require("express");
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    title:{
        type: String
    },
    tags:{
        type: String
    },
    isPublished: {
        type: Boolean
    },
    topic:{
        type: String
    },
    blog:{
        type: String,
        required: true
    }   
})

const blogPost = new mongoose.model("blogPost", blogSchema);

module.exports = blogPost;