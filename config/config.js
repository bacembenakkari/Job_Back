require("dotenv").config();

const config={
    DB_URL:process.env.MONGO_URL
}
module.exports=config;