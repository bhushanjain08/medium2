require('dotenv').config();
const express = require("express");
require("../src/db/conn");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
const UserRegistration = require("./models/registration");

const regRouter = require("../src/routers/regRouter");
app.use(regRouter);

const loginRouter = require("../src/routers/login");
app.use(loginRouter);


app.listen(port, () => {
    console.log(`connection at ${port}`);
})
