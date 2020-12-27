const express = require("express");
const homeRouter = new express.Router();
const auth = require("../middleware/auth");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const blogPost = require("../models/blogPostModel");
const app =express();

const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title: 'All Blogs',
            version: '1.0.0',
            description: 'get all the blogs in home page after login'
        }
    },
    apis:['../controller/home.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
console.log(swaggerDocs);
homeRouter.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));



//All blogPosts
/**
 * @swagger
 * /home:
 *  get:
 *   description use to request all posts
 *   responses:
 *   '200':
 *     description: a successful response
 */
homeRouter.get("/home", async (req, res) => {
    try {
        const blogs = await blogPost.find({});
        
        res.status(201).send(`HomePage 
        ${req.user.fname} ${req.user.email} ${blogs} `);
       
    } catch (error) {
        res.send(error);
    }
});

// By ID
homeRouter.get("/home/:id", auth, async (req, res) => {
    try {   
        const _id = req.params.id;
        const blogs = await blogPost.findById({_id});
        // res.send(blogs);
       // console.log(req.user.email);
        res.status(201).send(`HomePage 
           ${req.user.fname} ${req.user.email} ${blogs} `);
    } catch (error) {
        res.send(error);
    }
});

homeRouter.post("/home/blogpost", auth, async (req, res) => {
    try {
        const addPost = new blogPost(req.body);
        console.log(req.body);
        const insertPost = await addPost.save();
        res.status(201).send(insertPost);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = homeRouter;