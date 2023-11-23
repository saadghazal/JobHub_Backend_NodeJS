const mongoose = require("mongoose");
const JobSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        location: {type: String,required: true},
        company:{type: String,required:true},
        description: {type: String, required: true},
        salary: {type: String, required: true},
        period: {type: String ,required: true}, // period means if the job salary will be monthly or daily etc.
        contract: {type: String,required: true}, // contract means if the job is a part-time or full-time etc.
        requirements: {type: Array,required: true},
        image_url: {type:String ,required: true},// company image
        agent_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },{timestamps: true}
)

module.exports = mongoose.model("Job",JobSchema)