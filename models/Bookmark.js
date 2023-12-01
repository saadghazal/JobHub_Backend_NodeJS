const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema(
    {
        job: {type: mongoose.Schema.Types.ObjectId, ref: "Job"},
        user_id: {type: String,required: true},
       
    },{timestamps: true}
)

module.exports = mongoose.model("Bookmark",BookmarkSchema)