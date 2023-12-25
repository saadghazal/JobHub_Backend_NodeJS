 const router = require("express").Router();
const bookmarkController = require("../controllers/bookmarkController");
 let {verifyAndAuthorize , verifyToken, verifyAndAdmin} = require("../middleware/verifyToken")


// CREATE BOOKMARKS
router.post("/", verifyAndAuthorize,bookmarkController.createBookmark);


// DELETE BOOKMARKS

router.delete("/:id", verifyAndAuthorize,bookmarkController.deleteBookmark);


// GET BOOKMARKS THAT BELONGS TO THE USER
router.get("/:userId", verifyAndAuthorize,bookmarkController.getBookmarks);



module.exports = router