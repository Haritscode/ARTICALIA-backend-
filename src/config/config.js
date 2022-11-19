const Sequelize=require("sequelize");
const sequelize=new Sequelize("user_db","Harit","Harit1273#",{
    host:"localhost",
    dialect:'mysql',
});
async function isConneccted(){
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully');
    }
    catch(err){
        console.error("unable to connect to db");
    }
}
isConneccted();
module.exports=sequelize;