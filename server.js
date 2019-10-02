const express = require('express')
const app = express()
const port = 3100
var mongoose = require('./db');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken')
var User = require('./models/user.js');
var config = require('./config');
var verifyToken = require('./verifyToken');
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('PayRoll Manager an Ranking System'))

app.post('/register', (req, res) => {

    console.log(req);
    var obj = req.body;
    console.log(obj);
    User.create(obj).then((doc) => {
        console.log(doc);
        res.status(200).send({
            data: doc
        });
    }).catch((err) => {
        res.status(500).send({
            message: err.toString()
        });
    })

});

app.post('/login', function (req, res) {

    User.findOne({
        emp_id: req.body.emp_id
    }, async function (err, user) {
        if (err) return res.status(500).send({
            message: err.toString()
        });
        if (!user) return res.status(400).send({
            message: 'Invalid Credentials'
        });

        if (user.password === req.body.password)
            var passwordIsValid = true;
        if (!passwordIsValid) return res.status(400).send({
            auth: false,
            token: null,
            message: 'Invalid Credentials'
        });

        var token = jwt.sign({
            username: user.username
        }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({
            auth: true,
            token: token,
            employer:user.employer
        });
    });

});


app.post('/viewAllUsers', (req, res) => {

    console.log(req);
    var obj = req.body;
    console.log(obj);
    User.find({
      
    }, async function (err, user) {
        if (err) return res.status(500).send({
            message: err.toString()
        });
        if (!user) return res.status(400).send({
            message: 'No Users Exist'
        });

        if (user) {
            res.status(200).send({
                data: user
            });
        }
    });

});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))