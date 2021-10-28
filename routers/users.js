const express = require('express');
const router = express.Router();
const {User} = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authJwt = require('../helpers/jwt');


router.get(`/`, async (req, res) => {
    const userList = await User.find().select('-passwordHash');
    if(!userList){
        return res.status(400).json({msg:'no user found'})
    }
    res.send(userList);
});

router.post('/', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    });

    user = await user.save();

    if (!user) {
        return res.status(400).json({msg: 'The user can not registered'});
    }

    res.send(user);


});


router.get('/:id',authJwt,async (req,res)=>{
    const user = await User.findById(req.params.id).select('-passwordHash');
     if(!user){
        res.status(500).json({message:'User not found'});
    }
    res.status(200).send(user);
});


router.post('/login',async (req,res)=>{
    let user = await User.findOne({email:req.body.email});
    let secret = process.env.secret;
    if (!user) {
        return res.status(400).json({msg:'User Not found'});
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        let token = jwt.sign({
            userId:user.id,
            isAdmin:user.isAdmin
        },secret,{expiresIn:'1d'});

        return res.status(200).send({user:user.email, token:token});
    }else{
         return res.status(400).send('pasword is wrong');
    }

    res.status(200).send(user);
});


module.exports = router;
