require('dotenv').config();
const express=require("express");
const sequelize=require("./config/config")
const Sequelize=require("sequelize")
const user=require("./config/models/users")
const createblog=require("./apis/createBlog")
const jwt=require("jsonwebtoken");
const morgan=require("morgan");
const { notfound, errorHandler } = require('../middleware');
const port=process.env.PORT
const app=express();
app.use(express.json());
app.use(morgan('common'));

const isValiduser=async(req,res,next)=>{
    let data=req.body;
    const isuserregistered=await user.findOne({where:{email:data.email}})
    if(isuserregistered){
        const password=await sequelize.query(`SELECT cast(AES_DECRYPT(Password,FirstName) AS char) from Users where email="${data.email}"`);
        
        if( data.Password===Object.values(password[0][0])[0] && data.email===isuserregistered.email ){
            req.locals={id:Object.values(isuserregistered)[0].id};
            next();
        }
            else{
                res.send("Incorrect password")
            }
    }else{
        res.send("User not found")
    }
}
const registerUser=async(req,res,next)=>{
    let data=req.body;
    const result=await user.create({
        FirstName:data.FirstName,
        LastName:data.LastName,
        email:data.email,
        Password:Sequelize.fn("AES_ENCRYPT",data.Password,data.FirstName),
        Description:data.Description
    })
    req.locals={id:Object.values(result)[0].id}
    next(); 
}
// middleware for autherization
const isauthorizedUser=(req,res,next)=>{
    const authHeader=req.headers["auth"];
    const token=authHeader && authHeader.split(" ")[1];
    if(token==null) return res.sendStatus(401)
    jwt.verify(token,process.env.SECRET_ACCESS_TOKEN,(err)=>err?res.send(false):next())
}

// for test
app.get("/",(req,res)=>{
    res.json({
        message:"api working... 💐.."
    })
})


// apis starts here

app.post("/register",registerUser,(req,res)=>{
    const register=req.body.email;
    const accessToken=jwt.sign(register,process.env.SECRET_ACCESS_TOKEN)
    res.json({accessToken:accessToken,id:req.locals.id});
});
app.post("/in",isValiduser,(req,res)=>{
    const register=req.body.email;
    const accessToken=jwt.sign(register,process.env.SECRET_ACCESS_TOKEN)
    res.json({accessToken:accessToken,id:req.locals.id});
});
app.use('/createblog',isauthorizedUser,createblog)


// apis end here
app.use(notfound)
app.use(errorHandler)
app.listen(port,()=>console.log(`server is running at ${port}`));
console.log(Date.UTC);