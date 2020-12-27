require('dotenv').config();
const express = require("express");
require("../src/db/conn");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
const UserRegistration = require("./models/registration");

const regRouter = require("./controller/regRouter");
app.use(regRouter);

const loginRouter = require("./controller/login");
app.use(loginRouter);

const homeRouter = require("./controller/home");
app.use(homeRouter);

const followRouter = require("./controller/follow");
app.use(followRouter);

const publicationRouter = require("./controller/publication");
app.use(publicationRouter);

const blog = require("./controller/blogPost");
app.use(blog);

app.get("/logout", auth, async(req,res) => {
    try {

        req.user.tokens = [];
        res.clearCookie("jwt");
        await req.user.save();
        console.log("logout page successfully");
        res.send("Logout");
    } catch (error) {
        res.status(500).send(error);
        console.log("Error found");
    }
}) 


app.listen(port, () => {
    console.log(`connection at ${port}`);
})
