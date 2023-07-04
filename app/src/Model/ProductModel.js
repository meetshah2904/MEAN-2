const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductSchema = new mongoose.Schema({
    pname:String,
    price:Number,
    qty:Number,
    categoryId :{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"Category"
      }
});

module.exports = mongoose.model("Product",ProductSchema)