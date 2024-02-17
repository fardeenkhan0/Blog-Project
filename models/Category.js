const mongoose =require("mongoose")

//define schema
const CategorySchema = new mongoose.Schema({
   cat_name:{
        type: String,
        required: true
    }
},{timestamps:true})

//create collection
const CategoryModel = mongoose.model('category',CategorySchema)//Category is the name of collection
module.exports=CategoryModel