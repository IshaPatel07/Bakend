import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name:{type:String,required:true,trim:true},
  category:{type:String,required:true,trim:true},
  price:{type:Number,required:true,min:0},
  oldPrice:{type:Number,default:0,min:0},
  rating:{type:Number,default:4.5,min:0,max:5},
  image:{type:String,default:""},
  tag:{type:String,default:""}
},{timestamps:true});
export default mongoose.model("Product",schema);