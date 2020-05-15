let express = require("express")
const mongoose = require("mongoose");
const userModel = require('../models/user.js')

exports.register = (req,res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let confirmpassword = req.body.confirmpassword;
    if (password !== confirmpassword) {
        res.json({
          message: "Passwords do not match!",
        });
    }
    else{
        let userDetails = new userModel({
            _id: mongoose.Types.ObjectId(),
            username: username,
            email: email,
            password: password,
          });
          
          userDetails
          .save()
          .then((doc) => {
            res.status(201).json({
              message: "User Registered Successfully",
              results: doc,
            });
          })
          .catch((err) => {
            res.json(err);
          });
    }
} 
