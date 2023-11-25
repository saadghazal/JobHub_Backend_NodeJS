const User = require("../models/User")
const cryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")


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
            !user && res.status(401).json( "Wrong Login Details")

            const decryptedPassword = cryptoJS.AES.decrypt(user.password, process.env.SECRET)
            const depassword = decryptedPassword.toString(cryptoJS.enc.Utf8)

            // if the entered password not equal the user password
            depassword !== req.body.password && res.status(401).json( "Wrong Password")


            const token = jwt.sign({
                email: user.email,
                userId: user._id,
                username: user.username,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '50d'
            }
            )
            // i want every feild except password , __v,createdAt ,updatedAt
            let {password , __v,createdAt ,updatedAt, ...others} = user._doc


            res.status(200).json({...others,userToken: token})

        } catch(e){
            res.status(500).json(
                "Unexpected Error"
            )
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