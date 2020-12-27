const express = require("express");
const followRouter = new express.Router();
const auth = require("../middleware/auth");

const UserRegistration = require("../models/registration");

//update by id 
followRouter.patch("/follow/:id", auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const getUserByid = await UserRegistration.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        console.log(req.body);
        res.send(getUserByid);
    } catch (error) {
        res.status(500).send(error);        //500 = server error
        console.log("error found");
    }
});
followRouter.post("/user/follow", auth,(req, res, next) => {
    User.findById(req.body.id).then((user) => {
        return user.follow(req.body.user_id).then(() => {
            return res.json({msg: "followed"})
        })
    }).catch(next)
} )

module.exports = followRouter;