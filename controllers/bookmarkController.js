const Bookmark = require("../models/Bookmark")
const Job = require("../models/Job")


module.exports = {
    createBookmark: async (req, res) => {
        const jobId = req.body.job;


        try{

            const job = await Job.findById(jobId)
            if(!job){
              return  res.status(404).json({
                error: "Job Not Found"
              })
            }
            const newBook = new Bookmark({
                job: job,
                user_id: req.user._id
            })

            const savedBookmark = await  newBook.save()

            let {__v,updatedAt,createdAt,...newBookmarkInfo} = savedBookmark._doc
            res.status(201).json(newBookmarkInfo)
        }catch (error){
            res.status(500).json(error)
        }

    },

    deleteBookmark: async (req,res)=>{
        try{
            const userId = req.user._id
            const jobId = req.params.id
            await Bookmark.findOneAndDelete({ userId, jobId})

            res.status(200).json("Bookmark Deleted Successfully")

        }catch (error) {
            res.status(500).json(error)

        }

    },
    getBookmarks: async (req,res) =>{
        try{
            const bookmarks = await Bookmark.find({user_id:req.user._id}).populate('job');

            res.status(200).json(bookmarks)

        }catch (error) {
            res.status(500).json(error)

        }
    }


}