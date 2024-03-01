const router = require("express").Router();
const messageController = require("../controllers/messageController");
let {verifyAndAuthorize , verifyToken, verifyAndAdmin} = require("../middleware/verifyToken")

// SEND MESSAGES
router.post("/",verifyToken,messageController.sendMessage);

// GET ALL MESSAGES
router.get("/:id",verifyToken,messageController.getAllMessages);





module.exports = router