const express = require('express');
const router = express.Router();
const {Product} = require('../models/product');


router.get(`/`,async (req,res)=>{
    const productLis = await Product.find();
    res.send(productLis);
});



router.post(`/`,(req,res)=>{
    const saveproduct = new Product({
        name : req.body.name,
        image : req.body.image,
        countInStoke : req.body.countInStoke,
    });

    saveproduct.save().then(productcreate=>{
        res.status(201).json(productcreate);
    }).catch((err)=>{
        res.status(500).json({
            error:err,
            success: false
        });
    });
    console.log('done');
});


module.exports = router;
