const express = require("express");
const mongoose  = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const regSchema = new mongoose.Schema({   
    fname:{
        type: String,
        required: true    
    },
    lname:{
        type: String,
        required: true      
    },
    dob:{
        type: Date       
    },
    country:{
        type: String      
    },
    email:{
        type: String,
        required: true,
        unique: [true, "Email id already present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid email');
            }
        }   
    },
    pwd:{
        type: String,
        required: true
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
})

// generating token
regSchema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id : this._id.toString()}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token : token});
        await this.save();
        return token;
    } catch (error) {
        res.send("the error" + error);
        console.log("the error" + error);
    }
}

//converting password into hash
regSchema.pre("save", async function (next) {
    if(this.isModified("pwd")){
       // console.log(`current pws is ${this.pwd}`);
        this.pwd = await bcrypt.hash(this.pwd, 10);
       // console.log(`current pws is ${this.pwd}`);
    }
   next();

})

const UserRegistration = new mongoose.model("Userregistration", regSchema);

module.exports = UserRegistration;