const users = require('../models/users');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.use(express.json());

app.get('/list', async (req, res) => {
    let usersData = await users.find();
    console.log(usersData);
    res.send(usersData);
});

app.post('/add', async (req, res) => {
    let {email, password} = req.body;
    let duplicateEmail = await users.findOne({ email })

    if (duplicateEmail) return res.status(400).send("User already registered.");
    
    if(!(email && password)){
        res.status(400).send({
            error : "Data not formatted properly"
        });
    }
    let user = new users(req.body);
    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.save().then(doc => res.status(201).send({
        message : "User Created Successfully",
        status : true,
        data: doc
    }));
})

app.listen(9900, () => {
    console.log(`Server Started at ${9900}`)
});