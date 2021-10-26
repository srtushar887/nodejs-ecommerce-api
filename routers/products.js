const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const {Product} = require('../models/product');
const mongoose = require('mongoose');


router.get(`/`,async (req,res)=>{
    let filter = {};
    if(req.query.category){
        filter = {category: req.query.category.split(',')};
    }
    const productLis = await Product.find(filter).populate('category');
    res.send(productLis);
});


router.get(`/:id`,async (req,res)=>{
    let product = await Product.findById(req.params.id).populate('category');
    if(!product){
        return res.json({msg:'No Product'});
    }
    res.send(product);
});



router.post(`/`,async (req,res)=>{

    try{
        let category = await Category.findById(req.body.category);

        if(!category){
            return res.json({msg:'Invalid Category'});
        }

        let saveproduct = new Product({
            name : req.body.name,
            description : req.body.description,
            richDescription : req.body.richDescription,
            image : req.body.image,
            brand : req.body.brand,
            price : req.body.price,
            category : req.body.category,
            countInStoke : req.body.countInStoke,
            rating : req.body.rating,
            numReviews : req.body.numReviews,
            isFeatured : req.body.isFeatured,
        });

        product = await saveproduct.save();
        if(!product){
            return res.status(400).json({msg:'The product can not be created'});
        }

        return res.send(product);
    }catch(e){

    }
    
});




router.put(`/:id`,async (req,res)=>{
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.json({msg:'Invalid Prodct ID'});
    }

    try{

        let category = await Category.findById(req.body.category);

        if(!category){
            return res.json({msg:'Invalid Category'});
        }

        let product = await Product.findByIdAndUpdate(req.params.id,{
            name : req.body.name,
            description : req.body.description,
            richDescription : req.body.richDescription,
            image : req.body.image,
            brand : req.body.brand,
            price : req.body.price,
            category : req.body.category,
            countInStoke : req.body.countInStoke,
            rating : req.body.rating,
            numReviews : req.body.numReviews,
            isFeatured : req.body.isFeatured,
        },{new:true});

        

        product = await product.save();
        if(!product){
            return res.status(400).json({msg:'The product can not be created'});
        }

        return res.send(product);
    }catch(e){

    }
    
});



router.delete('/:id',(req,res)=>{
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.json({msg:'Invalid Prodct ID'});
    }
    Product.findByIdAndRemove(req.params.id).then(pro =>{
        if(pro){
            return res.status(200).json({
                success:true,
                message:'Product Deleted'
            })
        }else{
            return res.status(404).json({
                success:false,
                message:'Product Not Found'
            })
        }
    }).catch((err)=>{
        return res.status(400).json({
            success:false,
            error:err
        })
    })

});



router.get(`/get/count`,async (req,res)=>{
    let productCount = await Product.countDocuments();
    
    if(!productCount){
            res.json({msg:'prouct not found'});
        }

    res.send(productCount);
});


router.get(`/get/featured/:count`,async (req,res)=>{
    let count = req.params.count ? req.params.count : 0;
    let productFeatured = await Product.find({isFeatured:true}).limit(+count);
        
    if(!productFeatured){
            res.json({msg:'prouct not found'});
        }

    res.send(productFeatured);
});



module.exports = router;
