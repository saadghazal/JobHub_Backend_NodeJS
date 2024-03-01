const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    sender: {type: mongoose.Schema.ObjectId,ref:'User'},
    content: {type: String},
    receiver: {type: mongoose.Schema.ObjectId,ref:'User'},
    chat: {type: mongoose.Schema.ObjectId,ref:'Chat'},
    readBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},{timestamps: true})


module.exports = mongoose.model("Message",messageSchema)