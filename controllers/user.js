class Userconroller
{
 
  async register(req,res)
  {
    try
    {
      //express validator used

      req.check('username','Length of name should be min 3 characters').isLength({min: 3});
      req.check('email','Invalid email').isEmail();
      req.check('password','Invalid password').notEmpty().isLength({min:6})
      const errors = await req.validationErrors();
      if(errors)
      {
        return res.status(422).json({errors:errors})
      }
      
  }
  catch(error){
    let response = {};
    response.success = false;
    response.data = error;
    res.status(404).send(response);
  }
}

  async login(req,res)
  {
    try
    {
      //express-validators is used for validation of input.
      req.checkBody('email','Invalid email').notEmpty().isEmail();
      req.checkBody('password','Invalid password').notEmpty().isLength({ min:6})
      const errors = await req.validationErrors();
      if(errors)
      {
        return res.status(422).json({errors:errors});
      }
    }
    catch(error) 
        {
          let response = {};
          response.success = false;
          response.data = error;
          res.status(404).send(response);
        }    
    }
}
module.exports = new Userconroller();