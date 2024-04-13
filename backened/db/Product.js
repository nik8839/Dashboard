const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
    P_name:String,
    price:String,
    category:String,
    userId:String,
    company:String
});
module.exports=mongoose.model("products",productSchema); 