const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB,{
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}).then(() => {
    console.log("connection db successfull");
}).catch((e) => {
    console.log("not connected to db");
})