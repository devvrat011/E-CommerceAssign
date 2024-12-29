import express from 'express';
import cors from 'cors';

import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/OrderRoutes.js';
import bodyParser from 'body-parser';
import path from 'path';

dotenv.config();
const __dirname=path.resolve();
const app = express();
app.use(cors());
app.use(express.json());

// console.log(process.env.PORT);
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL) 
.then(() => {
    app.listen(PORT, ()=> console.log(`Server Port: ${PORT}`));
})
.catch((error) => console.log(`${error} did not connect`));


app.use(bodyParser.json());
app.use(cookieParser()); 

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.use(express.static(path.join(__dirname,'client/build')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','build','index.html'));
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
});