const User = require("../models/User");
const cryptoJS = require("crypto-js")

module.exports = {
    updateUser: async (req, res) => {

        console.log("hi")
        if(req.body.password){
            // encrypt the password
            req.body.password = cryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString();
        }

        try{
            const UpdateUser = await User.findByIdAndUpdate(
                req.params.id , 
                {$set: req.body,},//set the new body to update the user
                {new: true}
            )
            const {password , __v, createdAt,...others} = UpdateUser._doc;
            console.log("hi 2")
            res.status(200).json(others)
        }catch(e){
           
            res.status(500).json(e)

        }

    },


}