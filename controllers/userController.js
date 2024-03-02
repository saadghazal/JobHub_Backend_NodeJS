const User = require("../models/User");
const cryptoJS = require("crypto-js")

module.exports = {
    updateUser: async (req, res) => {
        
        if(req.body.password){
            // encrypt the password
            req.body.password = cryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString();
        }

        try{ 
            const UpdateUser = await User.findByIdAndUpdate(
                req.user._id , 
                {$set: req.body,},//set the new body to update the user
                {new: true}
            )
            const {password , __v, createdAt,...others} = UpdateUser._doc;
            res.status(200).json(others)
        }catch(e){
           
            res.status(500).json(e)

        }

    },

    deleteUser:async (req,res)=>{
        try{
            await User.findByIdAndDelete(req.user._id)
            res.status(200).json("Account Successfully Deleted")
        }catch(error){
            res.status(500).json(error)
        }
    },
    getUser: async (req,res)=>{
        try{
            const user = await User.findById(req.user._id)
           

            const {password,__v,createdAt,updatedAt,...others} = user._doc
            res.status(200).json(others)
        }catch(error){
            res.status(500).json(error)
        }
    },
    getAllUsers: async (req,res)=>{
        try{
            const users = await User.find()

            res.status(200).json(users)
        }catch(error){
            res.status(500).json(error)
        }
    }


}