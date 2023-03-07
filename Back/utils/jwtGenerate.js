const jwt = require ("jsonwebtoken");
const router = require("../routes/auth");
require ("dotenv").config();

function jwtGenerate (id){
    const payload = {
        user:id
    }
    return jwt.sign(payload,process.env.jwtSecret,{expiresIn:"1hr"})
}

module.exports= jwtGenerate;