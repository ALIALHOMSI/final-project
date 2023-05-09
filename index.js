import express from 'express'
import dotenv  from 'dotenv'
import cors  from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import db from './config/db.js'
import productsRoute from './routes/productsRoute.js'
import userRoute from './routes/userRoute.js'

// import productsroute from './routes/productsRoute.js'

const app=express();
dotenv.config()
await db()
app.use(express.json())


// Set up middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// app.use('/api',productsroute)
app.use('/api',productsRoute);
app.use('/api', userRoute);



if (process.env.NODE_ENV === "development") {
  app.use(morgan('dev'));
}
const port=process.env.port||3000

app.listen(port,()=>{
    console.log(`working on port ${port}`)
})