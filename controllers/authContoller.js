const User = require("../models/User")


module.exports  = {
    createUser: async (req,res)=>{
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
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