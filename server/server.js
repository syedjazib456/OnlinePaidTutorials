require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./router/auth-router');
const connectDB = require('./utils/db');
const courseroute = require('./router/course-router');
const adminroute = require('./router/admin-router');
const contactroute = require('./router/contact-router');
const paymentroute = require('./router/payment-router');
const subscriptionroute = require('./router/subscription-router');
const path = require('path');
const corsOption={
    origin:'http://localhost:5173',
    methods:'GET,POST,PUT,DELETE,PATCH,HEAD',
    credentials:true
}
//Add this middleware to work with json
//Middleware
//Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
//CROSS ORIGIN RESOURCE SHARING
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors(corsOption));
app.use(express.json());//delegate
app.use('/api/auth',contactroute);
app.use('/api/auth',router);
app.use('/api/data',courseroute);
app.use('/api/admin',adminroute);
app.use('/api/payment',paymentroute);
app.use('/api/subscription',subscriptionroute);
connectDB().then(()=>{
    app.listen(5000,()=>{
    console.log('Server is running on Port # 5000');
});

})