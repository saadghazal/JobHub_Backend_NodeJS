const Bookmark = require("../models/Bookmark")


module.exports = {
    createBookmark: async (req, res) => {
        const newBook = new Bookmark(req.body)
        try{
            await  newBook.save()

            res.status(201).json("Bookmark Successfully Created ")
        }catch (error){
            res.status(500).json(error)
        }

    },

    deleteBookmark: async (req,res)=>{

    },
    getBookmarks: async (req,res) =>{

    }


}