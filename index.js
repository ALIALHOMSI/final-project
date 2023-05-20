import express from 'express'
import dotenv  from 'dotenv'
import cors  from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import db from './config/db.js'
import productRoute from './routes/productRoute.js'
import productInfoRoute from './routes/productInfoRoute.js'
import productImageRoute from './routes/productImageRoute.js'
import userRoute from './routes/userRoute.js' 
import contactRoute from './routes/contactUsRoute.js'
import cartRoute from './routes/cartRoute.js'
const app=express();
dotenv.config()
await db()
app.use(express.json())

// Set up middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use('/api',productsroute)
app.use('/api/product',productRoute);
app.use('/api', userRoute);
app.use('/api/productinfo',productInfoRoute)
app.use('/api/productimage',productImageRoute)
app.use('/api/contactus',contactRoute)
app.use('/api/cart',cartRoute)

if (process.env.NODE_ENV === "development") {
  app.use(morgan('dev'));
}
const port=process.env.port||3000

app.listen(port,()=>{
    console.log(`working on port ${port}`)
})