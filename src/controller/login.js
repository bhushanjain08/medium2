const express = require("express");
const loginRouter = new express.Router();
const bcrypt = require("bcrypt");

const UserRegistration = require("../models/registration");

loginRouter.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const pwd = req.body.pwd;

        const useremail = await UserRegistration.findOne({ email: email });
        const isMatch = await bcrypt.compare(pwd, useremail.pwd);

        const token = await useremail.generateAuthToken();
        //console.log(token);

        //creating cookie
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 600000)
        });

        //console.log(`Cookie = ${req.cookies.jwt}`);

        if (isMatch) {
            res.status(201).send("Login successful");
        } else {
            res.send("Invalid Login Details");
        }
    } catch (error) {
        res.status(400).send("Invalid Login Details");
    }
});

module.exports = loginRouter;