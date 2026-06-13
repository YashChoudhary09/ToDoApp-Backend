
const mongoose = require('mongoose');



const connectDB = async() => {
    try{
        let connection = await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("DataBase is connected successfully!");
    } catch(error){
       console.log(`Error:${error.message}`);
       process.exit(1);
    }
}

module.exports=connectDB;