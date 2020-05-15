const express = require('express');
const bodyParser = require('body-parser');

const dbConfig = require('./app/config/database.config.js')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/',(req,res) => {
    res.json({"message":"Welcome to User Registration API"})
})

require('./app/routes/user.route.js')(app)

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
})