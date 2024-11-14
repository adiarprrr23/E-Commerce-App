import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"

// Placing Orders Using COD Method
const placeOrder=async(req,res)=>{
    try {
        const {userId,items,amount,address}=req.body

        const orderData={
            userId:userId,
            items:items,
            amount:amount,
            address,
            paymentMethod:'COD',
            payment:false,
            date:Date.now()
        }

        const newOrder=new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true,message:"Order Placed Successfully"})


    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error Placing Order"})
    }
}

// Placing Orders Using Stripe Method
const placeOrderStripe=async(req,res)=>{

}

// Placing Order using RazorPay
const placeOrderRazorPay=async(req,res)=>{

}

// ALl orders data for admin panel
const allOrders=async(req,res)=>{
    try {

        const orders=await orderModel.find({})
        res.json({success:true,message:"All Orders",orders})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// User Order data for frontend
const userOrders=async(req,res)=>{
    try {
        
        const {userId}=req.body
        const orders=await orderModel.find({userId})
        res.json({success:true,message:"Orders Retrieved Successfully",orders})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// Update Order Status from Admin Panel
const updateStatus=async(req,res)=>{
    try {
        const {orderId,status}=req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {placeOrder,placeOrderStripe,placeOrderRazorPay,allOrders,userOrders,updateStatus}