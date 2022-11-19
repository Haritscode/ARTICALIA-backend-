const { DATE, UUID } = require("sequelize");
const {DataTypes,Sequelize}=require("sequelize");
const sequelize = require("../config");
const blogs=sequelize.define("blog_data",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
    },
    create_by:{
        type:DataTypes.UUID,
        references:{
            model:'Users',
            key:"id"
        },
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    Tags:{
        type:DataTypes.STRING(10000),
    },
})
let createBlog=async()=>{
    try{
        await blogs.sync();
    }
    catch(err)
    {
        console.log(err);
    }
}
createBlog();
module.exports=blogs