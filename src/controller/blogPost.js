const express = require("express");
const blogRouter = new express.Router();
const Blog = require("../models/blogPostModel");
const auth = require("../middleware/auth");

blogRouter.post("/blog", auth, async (req, res) => {    
    try {
        const addBlog = new Blog(req.body);
        console.log(req.body);
        const insertBlog = await addBlog.save();
        res.status(201).send(insertBlog);
    } catch (error) {
        res.status(400).send(error);
    }
});

blogRouter.get("/blog", auth, async (req, res) => {
    try {
        const getBlog = await Blog.find({});
        res.send(getBlog);
    } catch (error) {
        res.status(400).send(error);
    }
});

//get by id
blogRouter.get("/blog/:id",auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const getBlogByid = await Blog.findById({ _id });
        res.send(getBlogByid);
    } catch (error) {
        res.status(400).send(error);        //400 bad request
    }
});

//update by id 
blogRouter.patch("/blog/:id",auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const getBlogByid = await Blog.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.send(getBlogByid);
    } catch (error) {
        res.status(500).send(error);        //500 = server error
    }
});

//delete by id 
blogRouter.delete("/blog/:id",auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const getBlogByid = await Blog.findByIdAndDelete(_id);
        res.send(getBlogByid);
    } catch (error) {
        res.status(500).send(error);        //500 = server error
    }
});

module.exports = blogRouter;