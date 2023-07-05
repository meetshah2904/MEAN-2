const mongoose = require("mongoose")
const CategorySchema = new mongoose.Schema({
    categoryname: {
        type: String,
        // required: { value: true, message: "Please Enter CategoryName"},
        // lowercase: true,
        // minLength:{value: 5,message:"CategoryName must be at least 5 characters"}
    }
})
module.exports = mongoose.model("Category",CategorySchema)