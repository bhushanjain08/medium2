const express = require("express");
const regRouter = new express.Router();


const UserRegistration = require("../models/registration");

regRouter.post("/registration", async (req, res) => {
    try {
        const addUser = new UserRegistration(req.body);
        console.log(req.body);

        const token = await addUser.generateAuthToken()

        const insertUser = await addUser.save();
        res.status(201).send(insertUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

regRouter.get("/", async (req, res) => {
    try {
        const getUser =  await UserRegistration.find({});        
        res.send(getUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

//get by id
regRouter.get("/user/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const getUserByid =  await UserRegistration.findById({_id});        
        res.send(getUserByid);
    } catch (error) {
        res.status(400).send(error);        //400 bad request
    }
});

//update by id 
regRouter.patch("/user/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const getUserByid =  await UserRegistration.findByIdAndUpdate(_id, req.body,{
            new: true
        });        
        res.send(getUserByid);
    } catch (error) {
        res.status(500).send(error);        //500 = server error
    }
});

//delete by id 
regRouter.delete("/user/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const getUserByid =  await UserRegistration.findByIdAndDelete(_id);        
        res.send(getUserByid);
    } catch (error) {
        res.status(500).send(error);        //500 = server error
    }
});

module.exports = regRouter;