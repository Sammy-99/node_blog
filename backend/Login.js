const Users = require('../models/users');
const express = require('express');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.use(cors());

app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    let user = await Users.findOne({ email });

    if ( user ) {
        let validPass = await bcrypt.compare(password, user.password);
        if(validPass){
            res.json({status: true, message : "Credentials matched"});
        }else{
            res.json({status: false, message: "Credentials not matched"});
        }
    } else {
        res.json({message: "User not found"});
    }
})

app.listen(9900, () => console.log('Server is running on 9900'));