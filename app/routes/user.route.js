module.exports = (app) => {
    const user = require('../controllers/user.controller.js')

    app.post('/register', user.register);

}