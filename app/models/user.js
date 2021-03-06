const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    created_at: {
        type: Date,
        default: Date.now 
    },
    updated_at: {
        type: Date,
        default: Date.now 
    }
})

const User = mongoose.model('users',userSchema);

class Usermodel 
{
    findOne(req)
    {
        return new Promise((resolve,reject) => 
        {
            User.findOne(req)
            .then(data => 
                {
                  resolve(data);
                })
            .catch(err=>
                {
                    console.log(err)
                    reject(err)
                })
        })
    }

    register(req,callback)
    {
        const user = new User({
             username:req.username,
             email:req.email,
             password:req.password,

        })
        user.save((err,result)=>
        {
            if(err)
                callback(err)
            else
            {
                let response = {
                    email:result.email,
                    sucess:true,
                }
                callback(null,response)
            }
        })
    }
    login(req,callback)
    {
        let response =
        {
            email:req.email,
            message:'Success'
        }
        callback(null,response)
    }
}
module.exports = new Usermodel();
