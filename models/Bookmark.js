const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema(
    {
        job: {type: String, required: true},
        user_id: {type: String,required: true},
        title: {type: String, required: true},
        company:{type: String,required:true},
        location: {type: String, required: true},
        image_url: {type: String ,required:true},
    },{timestamps: true}
)

module.exports = mongoose.model("Bookmark",BookmarkSchema)