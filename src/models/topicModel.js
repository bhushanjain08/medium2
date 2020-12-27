const express = require("express");
const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
    email:{
        type: String
    },
    topic: {
        type: String,
        required: true
    }
})

const blogTopic = new mongoose.model("Topic", topicSchema);

module.exports = blogTopic;