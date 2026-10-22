import {Router} from "express";
import Product from "../models/Product.js";
import auth from "../middleware/auth.js";
const router=Router();
router.get("/",async(req,res)=>{
  try {
    const filter={};
    if(req.query.category&&req.query.category!=="All") filter.category=req.query.category;
    if(req.query.search) filter.$or=[{name:{$regex:String(req.query.search),$options:"i"}},{category:{$regex:String(req.query.search),$options:"i"}}];
    const products=await Product.find(filter).sort({createdAt:-1});
    res.json({success:true,count:products.length,products});
  } catch { res.status(500).json({success:false,message:"Could not fetch products"}); }
});
router.get("/:id",async(req,res)=>{
  try { const p=await Product.findById(req.params.id); if(!p)return res.status(404).json({success:false,message:"Product not found"}); res.json({success:true,product:p}); }
  catch { res.status(400).json({success:false,message:"Invalid product ID"}); }
});
// For learning: these routes require login. Add an admin role before production use.
router.post("/",auth,async(req,res)=>{
  try { const p=await Product.create(req.body); res.status(201).json({success:true,product:p}); }
  catch(e) { res.status(400).json({success:false,message:e.message}); }
});
router.put("/:id",auth,async(req,res)=>{
  try { const p=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true}); if(!p)return res.status(404).json({success:false,message:"Product not found"}); res.json({success:true,product:p}); }
  catch { res.status(400).json({success:false,message:"Could not update product"}); }
});
router.delete("/:id",auth,async(req,res)=>{
  try { const p=await Product.findByIdAndDelete(req.params.id); if(!p)return res.status(404).json({success:false,message:"Product not found"}); res.json({success:true,message:"Product deleted"}); }
  catch { res.status(400).json({success:false,message:"Could not delete product"}); }
});
export default router;