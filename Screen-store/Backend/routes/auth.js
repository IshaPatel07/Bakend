import {Router} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const router=Router();
const tokenFor=(id)=>jwt.sign({userId:id},process.env.JWT_SECRET,{expiresIn:"7d"});
router.post("/signup",async(req,res)=>{
  try {
    const name=String(req.body.name||"").trim(), email=String(req.body.email||"").trim().toLowerCase(), password=String(req.body.password||"");
    if(!name||!email||!password) return res.status(400).json({success:false,message:"Name, email and password are required"});
    if(password.length<8) return res.status(400).json({success:false,message:"Password must be at least 8 characters"});
    if(await User.findOne({email})) return res.status(409).json({success:false,message:"Email already registered"});
    const user=await User.create({name,email,password:await bcrypt.hash(password,12)});
    res.status(201).json({success:true,token:tokenFor(user.id),user:{id:user.id,name:user.name,email:user.email}});
  } catch(e) { res.status(500).json({success:false,message:e.code===11000?"Email already registered":"Signup failed"}); }
});
router.post("/login",async(req,res)=>{
  try {
    const email=String(req.body.email||"").trim().toLowerCase(), password=String(req.body.password||"");
    const user=await User.findOne({email});
    if(!user||!(await bcrypt.compare(password,user.password))) return res.status(401).json({success:false,message:"Email or password is incorrect"});
    res.json({success:true,token:tokenFor(user.id),user:{id:user.id,name:user.name,email:user.email}});
  } catch { res.status(500).json({success:false,message:"Login failed"}); }
});
export default router;