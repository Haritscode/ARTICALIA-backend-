const express=require("express");
const router=express.Router();
const addBlog=require("../config/models/blogData")
const user=require("../config/models/users")
router.post("/",async(req,res)=>{
    const data=req.body;
    try{
        let result=await addBlog.create({
            create_by:req.headers.id,
            description:data.description,
            Tags:data.tags,
        })
        console.log(req.body)
        res.send(result)
    }
    catch(err)
    {
        console.log(err);
    }
})
module.exports=router;