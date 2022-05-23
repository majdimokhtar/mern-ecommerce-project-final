import path from "path"
import express from "express"
import dotenv  from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import {notFound , errorHandler} from "./middleware/errorMiddleware.js"


import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"

// convert from common js ro ES module add type:module to package.json ps add .js at the end

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV==="development") {
    app.use(morgan("dev"))
}

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('API is running')
} )

app.use('/api/products' ,productRoutes)
app.use('/api/users' ,userRoutes)
app.use('/api/orders' ,orderRoutes)
app.use('/api/upload' ,uploadRoutes)

app.get("/api/config/paypal" ,(req,res)=>
    res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use("/uploads",express.static(path.join(__dirname, "/uploads")))

//404 not found error middleware after all routes check errmiddleware
app.use(notFound)

//arrow middleware sometimes we have error even at 200 make condition check errmiddleware

app.use(errorHandler)



//environment variables:

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))