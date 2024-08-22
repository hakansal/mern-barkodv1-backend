const mongoose=require("mongoose");


const StuffSchema=new mongoose.Schema({
    barkod:{
        type:String,
        required:true,
        unique:true
        
        
    },
    isim:{
        type:String,
        required:true,

    },
    fiyat:{
        type:Number,
        required:true,

    },
    adet:{
        type:Number,
        required:true

    }

});
 
module.exports= mongoose.model("stuff", StuffSchema);;