const router = require("express").Router();
const userController = require("../controllers/userController");
let {verifyAndAuthorize , verifyToken} = require("../middleware/verifyToken")


// UPDATE USER 

router.put("/:id",verifyAndAuthorize,userController.updateUser);


// DELETE USER
router.delete("/:id",verifyAndAuthorize,userController.deleteUser)

// GET USER
router.get("/:id",verifyAndAuthorize,userController.getUser)





module.exports = router