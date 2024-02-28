const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    sender: {type: mongoose.Schema.ObjectId,ref:'User'},
    content: {type: String},
    receiver: {type: mongoose.Schema.ObjectId,ref:'User'},
    chat: {type: mongoose.Schema.ObjectId,ref:'Chat'}
},{timestamps: true})


module.exports = mongoose.model("Message",messageSchema)