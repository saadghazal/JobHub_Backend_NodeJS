const Job = require("../models/Job")


module.exports = {
    createJob: async (req, res) => {
        const newJob = new Job(req.body)

        try {
            const savedJob = await newJob.save();
            const {__v,createdAt,updatedAt,...newJobInfo} = savedJob._doc
            res.status(200).json(newJobInfo)
        } catch (error) {
            res.status(500).json(500)
        }
    },


} 