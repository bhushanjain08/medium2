const express = require("express");
const publicationRouter = new express.Router();
const Publication = require("../models/publicationModel");
const auth = require("../middleware/auth");

publicationRouter.post("/publication", auth, async (req, res) => {    
    try {
        const addPublication = new Publication(req.body);
        console.log(req.body);
        const insertPublication = await addPublication.save();
        res.status(201).send(insertPublication);
    } catch (error) {
        res.status(400).send(error);
    }
});

publicationRouter.get("/publication", auth, async (req, res) => {
    try {
        const getPublication = await Publication.find({});
        res.send(getPublication);
    } catch (error) {
        res.status(400).send(error);
    }
});

//get by id
publicationRouter.get("/publication/:id",auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const getPublicationByid = await Publication.findById({ _id });
        res.send(getPublicationByid);
    } catch (error) {
        res.status(400).send(error);        //400 bad request
    }
});

//update by id 
publicationRouter.patch("/publication/:id",auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const getPublicationByid = await Publication.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.send(getPublicationByid);
    } catch (error) {
        res.status(500).send(error);        //500 = server error
    }
});

//delete by id 
publicationRouter.delete("/publication/:id",auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const getPublicationByid = await Publication.findByIdAndDelete(_id);
        res.send(getPublicationByid);
    } catch (error) {
        res.status(500).send(error);        //500 = server error
    }
});

module.exports = publicationRouter;