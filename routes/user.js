module.exports = (app) => {
    const user = require('../controllers/user.js')

    app.post('/register', user.register);

    app.post('/login',user.login);

}