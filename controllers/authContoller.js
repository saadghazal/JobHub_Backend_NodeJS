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
    },

    loginUser: async (req,res)=>{
        try{
            const user = await User.findOne({email: req.body.email})

            // if the email entered not in the database
            !user && res.status(401).json({
                message: "Wrong Login Details"
            })

            const decryptedPassword = cryptoJS.AES.decrypt(user.password, process.env.SECRET)
            const password = decryptedPassword.toString(cryptoJS.enc.Utf8)

            // if the entered password not equal the user password
            password !== req.body.password && res.status(401).json({
                message: "Wrong Password"
            })


            res.status(200).json(user)

        } catch(e){
            res.status(500).json({
                message: "Unexpected Error"
            })
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