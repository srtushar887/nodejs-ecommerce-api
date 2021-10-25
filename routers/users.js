const express = require('express');
const router = express.Router();
const {User} = require('../models/User');


router.get(`/users`,async (req,res)=>{
    const userList = await User.find();
    res.send(userList);
});


module.exports = router;
