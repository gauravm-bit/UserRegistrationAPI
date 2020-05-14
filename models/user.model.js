const mongoose = require('mongoose');
mongoose.connect
const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username: {type:String,
        required:true,
        index:{
            unique: true,
        }},
    email:{
        type:String,
        required:true,
        index: {
            unique: true,
        }},
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now }
})

let userModel = mongoose.model('users',userSchema);
module.exports = userModel;
