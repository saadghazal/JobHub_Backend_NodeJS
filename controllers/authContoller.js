const User = require("../models/User")
const cryptoJS = require("crypto-js")


module.exports  = {
    createUser: async (req,res)=>{
        var encryptedPassword = cryptoJS.AES.encrypt(req.body.password, process.env.SECRET)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: encryptedPassword.toString(),
        })

        try{
            const savedUser = await  newUser.save()

            res.status(201).json(savedUser)
        }
        catch (e){
            res.status(500).json(e)
        }
    }
}
// module.exports = {
//     updateUser: async (req, res) => {
//
//     },
//
//
// }