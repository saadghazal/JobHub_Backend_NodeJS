const router = require("express").Router();
const chatController = require('../controllers/chatController')
let {verifyAndAuthorize , verifyToken, verifyAndAdmin} = require("../middleware/verifyToken")

// CREATE CHAT
router.post("/",verifyToken,chatController.accessChat);

// GET CHATS
router.get("/",verifyToken,chatController.getChat);





module.exports = router