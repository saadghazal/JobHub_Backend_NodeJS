const router = require("express").Router();
const userController = require("../controllers/userController");
let {verifyAndAuthorize , verifyToken, verifyAndAdmin} = require("../middleware/verifyToken")


// UPDATE USER 

router.put("/",verifyAndAuthorize,userController.updateUser);


// DELETE USER
router.delete("/",verifyAndAuthorize,userController.deleteUser)

// GET USER
router.get("/",verifyAndAuthorize,userController.getUser)

// GET All USERS
router.get("/",verifyAndAdmin,userController.getAllUsers)





module.exports = router