import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"


// description create new Order
// route get /api/orders
// access private route

const addOrderItems = asyncHandler (async (req,res)=>{
    const { orderItems ,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice } =req.body
            if (orderItems && orderItems.length===0) {
                res.status(400)
                throw new Error ("No order items")
                return
            } else {
                const order = new Order ({
            orderItems ,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
                })
                const createdOrder=await order.save()
                res.status(201).json(createdOrder)
            }

})


// description get orderby id
// route get /api/orders/:id
// access private route

const getOrderById = asyncHandler (async (req,res)=>{
    // populate attach to find by id name and email
    const order = await Order.findById(req.params.id).populate("user","name email")
if (order) {
    res.json(order)
} else{
    res.status(404)
    throw new Error("Order not found")
}
})



// update order to paid
// route GET/api/orders/:id/paid
// access private route

const updateOrderToPaid = asyncHandler (async (req,res)=>{
    
    const order = await Order.findById(req.params.id)
if (order) {
    order.isPaid=true,
    order.paidAt=Date.now(),
    order.paymentResult={
    id: req.body.id ,
    status: req.body.status ,
    update_time: req.body.update_time,
    email_address: req.body.email_address,
    }
    const updatedOrder=await order.save()
    res.json(updatedOrder)
} else{
    res.status(404)
    throw new Error("Order not found")
}
})



// update order to delivered
// route GET/api/orders/:id/deliver
// access private route

const updateOrderToDelivered = asyncHandler (async (req,res)=>{
    
    const order = await Order.findById(req.params.id)
if (order) {
    order.isDelivered=true,
    order.deliveredAt=Date.now()
    const updatedOrder=await order.save()
    res.json(updatedOrder)
} else{
    res.status(404)
    throw new Error("Order not found")
}
})



// Get login user orders
// route GET/api/orders/myorders
// access private route

const getMyOrders = asyncHandler (async (req,res)=>{
    // find orders with only logged in user
    const orders = await Order.find({user: req.user._id})
    res.json(orders)

})


// Get all orders
// route GET/api/orders
// access private/admin route

const getOrders = asyncHandler (async (req,res)=>{

    const orders = await Order.find({}).populate("user","id name")
    res.json(orders)

})






export {addOrderItems,
       getOrderById,
       updateOrderToPaid,
       getMyOrders,
       getOrders,
       updateOrderToDelivered}