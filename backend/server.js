import express from "express"
import cors from 'cors'
import connectDB from "./config/mongodb.js"
import 'dotenv/config'
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// App config
const app=express()
const port=process.env.PORT || 4000
connectDB()
connectCloudinary()

//Middlewares
app.use(express.json())
app.use(cors())

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)


// API Endpoints
app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(port,()=>console.log('Server started on PORT:'+port))