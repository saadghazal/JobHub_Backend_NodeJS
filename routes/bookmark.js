 const router = require("express").Router();
const bookmarkController = require("../controllers/bookmarkController");
 let {verifyAndAuthorize , verifyToken, verifyAndAdmin} = require("../middleware/verifyToken")


// CREATE BOOKMARKS
router.post("/", bookmarkController.createBookmark);


// DELETE BOOKMARKS

router.delete("/:id", bookmarkController.deleteBookmark);


// GET BOOKMARKS THAT BELONGS TO THE USER
router.get("/:userId", bookmarkController.getBookmarks);



module.exports = router