const userModel = require('../models/user.model.js')
let express = require("express")
const mongoose = require("mongoose");

exports.create = (req,res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let confirmPassword = req.body.confirmpassword;
    if (password !== confirmPassword) {
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
          
          userDetails.save()
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
