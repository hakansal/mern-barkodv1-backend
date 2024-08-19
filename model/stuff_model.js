const mongoose=require("mongoose");


const StuffSchema=new mongoose.Schema({
    barkod:{
        type:String,
        required:true,
        
        
    },
    isim:{
        type:String,
        unique:true

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