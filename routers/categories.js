const express = require('express');
const router = express.Router();
const {Category} = require('../models/category');


router.get(`/`,async (req,res)=>{
    const categoryList = await Category.find();
    if(!categoryList){
        return res.status(500).json({success:true});
    }
    return res.status(200).send(categoryList);
});


router.get('/:id',async (req,res)=>{
    const category = await Category.findById(req.params.id);
     if(!category){
        res.status(500).json({message:'Category ID not found'});
    }
    res.status(200).send(category);
});

router.post(`/`,async(req,res)=>{
    let category = new Category({
        name : req.body.name,
        color : req.body.color,
        icon : req.body.icon,
    });

    category = await category.save();
    if(!category){
        return res.status(404).send('category can not be created');
    }

    res.send(category);

});


router.put('/:id',async(req,res)=>{

  try{
    const category = await Category.findByIdAndUpdate(req.params.id,{
        name : req.body.name,
        color : req.body.color,
        icon : req.body.icon,
    },{
        new :true
    });
        if(!category){
            res.status(404).send('category can not be created');
        }
        res.json(category);
    }catch (e) {
        console.error(e.message);
        if (e.kind == "ObjectId"){
            return res.status(400).json({msg:"Server error"});
        }
        res.status(500).send('Server error');
    }

   
});

router.delete('/:id',(req,res)=>{
    Category.findByIdAndRemove(req.params.id).then(cat =>{
        if(cat){
            return res.status(200).json({
                success:true,
                message:'Category Deleted'
            })
        }else{
            return res.status(404).json({
                success:false,
                message:'Category Not Found'
            })
        }
    }).catch((err)=>{
        return res.status(400).json({
            success:false,
            error:err
        })
    })

});


module.exports = router;
