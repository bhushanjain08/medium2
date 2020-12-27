const express = require("express");
const mongoose = require("mongoose");

const publicationSchema = new mongoose.Schema({
    email:{
        type: String
    },
    publicationName: {
        type: String,
        required: true
    }
})

const publication = new mongoose.model("Publication", publicationSchema);

module.exports = publication;