const express = require('express');
const router = express.Router();
const {Category} = require('../models/category');


router.get(`/categories`,async (req,res)=>{
    const categoryList = await Category.find();
    res.send(categoryList);
});


module.exports = router;
