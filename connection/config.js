const mongoose=require("mongoose");
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
const connnect_TOdb=async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL,{});
        console.log("connected to db");

    } catch (error) {
        console.log(error);
        
    }
}
module.exports=connnect_TOdb;