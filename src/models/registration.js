const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const regSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
     },
    dob: {
        type: Date
    },
    country: {
        type: String
    },
    image: {
        type : String
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email id already present"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('invalid email');
            }
        }
    },
    pwd: {
        type: String,
        required: true
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    bio : {
        type: String
    }
    ,
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
    
})

regSchema.methods.follow = function (user_id) {
    if (this.following.indexOf(user_id) === -1) {
        this.following.push(user_id)        
    }
    return this.save()
}
regSchema.methods.addFollower = function (fs) {
    this.followers.push(fs)        
}

// generating token
regSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        res.send("the error" + error);
        console.log("the error" + error);
    }
}

//converting password into hash
regSchema.pre("save", async function (next) {
    if (this.isModified("pwd")) {
         this.pwd = await bcrypt.hash(this.pwd, 10);
         }
    next();

})

const UserRegistration = new mongoose.model("Userregistration", regSchema);

module.exports = UserRegistration;