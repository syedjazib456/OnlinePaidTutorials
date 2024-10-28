const mongoose = require('mongoose');

// const URI = "mongodb://127.0.0.1:27017/mern_admin";
const URI = process.env.MONGODB_URI;//for connection string

const connectDB = async ()=>{
 try{
  await mongoose.connect(URI);
  console.log("Connection Successful to DB");
 }
 catch(errors){
 console.log("Database Connection Failed");
 process.exit(0);
 }
}

module.exports = connectDB;