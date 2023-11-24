const User = require("../models/User");
const jwt = require("jsonwebtoken")

let verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token

    if (authHeader){
        let token = authHeader.split(" ")[1]
        // Bearer ${TOKEN}

        jwt.verify(token,process.env.JWT_SECRET, async (err,user)=>{
            if(err){
                res.status(403).json("Invalid Token")
            }

            req.user = user

            console.log(user)

            next()
        })
    }else {
        return res.status(401).json("You are not authenticated")
    }
}

let verifyAndAuthorize = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id){
            next()
        }else{
            res.status(403).json("You are restricted from preforming this operation")
        }

    }) 
}

module.exports = {
    verifyToken,
    verifyAndAuthorize
};
