 const router = require("express").Router();
const bookmarkController = require("../controllers/bookmarkController");
 let {verifyAndAuthorize , verifyToken, verifyAndAdmin} = require("../middleware/verifyToken")


// CREATE BOOKMARKS
router.post("/", verifyToken,bookmarkController.createBookmark);


// DELETE BOOKMARKS

router.delete("/:id", verifyToken,bookmarkController.deleteBookmark);


// GET BOOKMARKS THAT BELONGS TO THE USER
router.get("/:userId", verifyToken,bookmarkController.getBookmarks);



module.exports = router