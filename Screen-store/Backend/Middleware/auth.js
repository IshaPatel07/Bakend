import jwt from "jsonwebtoken";
export default function auth(req,res,next) {
  const header=req.headers.authorization || "";
  const token=header.startsWith("Bearer ") ? header.slice(7) : "";
  if(!token) return res.status(401).json({success:false,message:"Please log in first"});
  try { req.userId=jwt.verify(token,process.env.JWT_SECRET).userId; next(); }
  catch { return res.status(401).json({success:false,message:"Invalid or expired token"}); }
}