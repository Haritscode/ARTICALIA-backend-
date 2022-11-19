const DataTypes=require("sequelize")
const sequilize = require("../config")

const user=sequilize.define("User",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    FirstName:{
        type:DataTypes.STRING,
        allowNull: false
    },
    LastName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    Password:{
        type:DataTypes.BLOB,
        allowNull:false,
    },
    Description:{
        type:DataTypes.STRING,
        allowNull:true
    },
    profile_img:{
        type:DataTypes.STRING,
        allowNull:true
    }
})
let createModel=async()=>{
    try{
        await user.sync()
    }
    catch(err){
        console.log(err);
    }
}
createModel()
module.exports=user;