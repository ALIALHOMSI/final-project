import express from 'express'
import dotenv  from 'dotenv'
import cors  from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import db from './config/db.js'
import productsRoute from './routes/productsRoute.js'
// import productsroute from './routes/productsRoute.js'

const app=express();
dotenv.config()
await db()
app.use(express.json())




// app.use('/api',productsroute)
app.use('/api',productsRoute);



if (process.env.NODE_ENV === "development") {
  app.use(morgan('dev'));
}
const port=process.env.port||3000

app.listen(port,()=>{
    console.log(`working on port ${port}`)
})