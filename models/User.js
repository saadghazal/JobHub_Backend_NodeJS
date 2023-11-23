const mongoose = require("mongoose");

const  UserSchema = mongoose.Schema(
    {
        username:{type: String ,required: true,unique: true},
        email: {type: String ,required: true,unique: true},
        password: {type: String ,required: true},
        location: {type: String ,required: false},
        isAdmin: {type: Boolean,default:false},
        isAgent: {type: Boolean,default: false},
        skills: {type: Array},
        profile_image: {
            type: String,
            default: "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
        }
    },{timestamps: true},
);

module.exports = mongoose.model("User",UserSchema)