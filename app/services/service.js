const userModel = require('../models/user')

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
                    else{
                            let hash = util.hashPassword(req.password)
                            hash.then(data =>
                                {
                                    let request = {
                                        firstName:req.firstName,
                                        lastName:req.lastName,
                                        email:req.email,
                                        password:data
                                    }
                                    userModel.register(request,(err,result)=>
                                    {
                                        if(err)
                                            reject(err);
                                        else
                                            resolve(result);
                                    })
                                })
                                .catch(err=>
                                    {
                                        reject(err)
                                    })
                                }
                            })
                            .catch(err=>
                                {
                                    reject(err);
                                })
                             })
                }
     }
module.exports = new Userservice();