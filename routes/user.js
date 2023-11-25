const router = require("express").Router();
const userController = require("../controllers/userController");
let {verifyAndAuthorize , verifyToken} = require("../middleware/verifyToken")


// UPDATE USER 

router.put("/:id",verifyAndAuthorize,userController.updateUser);





module.exports = router