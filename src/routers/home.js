const express = require("express");
const homeRouter = new express.Router();
const auth = require("../middleware/auth");

homeRouter.get("/home", auth , async (req, res) => {
    try {
        //console.log(`cookie name = ${req.cookies.jwt}`);
        res.status(201).send("HomePage");
    } catch (error) {
        res.send(error);
    }
});

module.exports = homeRouter;