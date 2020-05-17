const userModel = require('../app/models/user');
const util = require('./util')

class Userservice
{
    register(req)
    {
        return new Promise((resolve,reject)=>
        {
            userModel.findOne({email:req.email})
            .then(data=>
            {
                if(data)
                {
                    reject({message:"Email already registered"})
                }
                else
                {
                    let hash = util.hashPassword(req.password)
                    hash.then(data => 
                        {
                            let request = {
                                username:req.username,
                                email:req.email,
                                password:data
                            }
                            userModel.register(request,(err,result)=>
                            {
                                if(err)
                                    reject(err)
                                else
                                    resolve(result)
                            })
                        })
                        .catch(err=>
                            {
                                reject(err)
                            })
                        }

                     })
                .catch(err =>
                    {
                        reject(err)
                    })
               })        
        }
        
    login(req,callback)
    {
        userModel.findOne({email:req.email})
        .then(data=>
            {
                util.comparePassword(req.password,data.password,(err,result)=>
                {
                    if(err)
                    {
                        callback(err)
                    }
                    else if(result)
                    {
                        userModel.login(data,(err,res)=>
                        {
                            if(err)
                                callback(err)
                            else    
                                callback(null,res)
                        })
                    }
                    else
                    {
                        console.log('Login Failed')
                        callback({message:"Wrong password entered"})
                    }
                })
                {

                }
            })
            .catch(err=>
                {
                    callback({message:'User not found'})
            })
    }
}
module.exports = new Userservice;