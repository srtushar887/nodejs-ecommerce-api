const express = require('express');
const router = express.Router();
const {Order} = require('../models/order');
const { OrderItem } = require('../models/order-Item');


router.get(`/`,async (req,res)=>{
    const orderList = await Order.find();
    if (!orderList) {
        return res.status(500).json({msg:'no order found'});
    }
    res.send(orderList);
});


router.post(`/`,async (req,res)=>{

    let orderItemsIds = Promise.all( req.body.orderItemsIds.map(async (orderitem)=>{
        let newOrderItem = new OrderItem({
            quantity:orderitem.quantity,
            product:orderitem.product,
        });
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;

    }));

    const orderItemsIdsResolved = await orderItemsIds;

    let order = new Order({
        orderItems : orderItemsIdsResolved,
        shippingAddress1 : req.body.shippingAddress1,
        shippingAddress2 : req.body.shippingAddress2,
        city : req.body.city,
        zip : req.body.zip,
        country : req.body.country,
        phone : req.body.phone,
        status : req.body.status,
        totalPrice : req.body.totalPrice,
        user : req.body.user,
    });

    order = await order.save();

    if (!order) {
        return res.status(500).json({msg:'order not save'});
    }

    res.send(order);

});


module.exports = router;
