const router = require("express").Router();
const userController = require("../controllers/userController");
let {verifyAndAuthorize , verifyToken, verifyAndAdmin} = require("../middleware/verifyToken")


// UPDATE USER 

router.put("/:id",verifyAndAuthorize,userController.updateUser);


// DELETE USER
router.delete("/:id",verifyAndAuthorize,userController.deleteUser)

// GET USER
router.get("/:id",verifyAndAuthorize,userController.getUser)

// GET All USERS
router.get("/",verifyAndAdmin,userController.getAllUsers)





module.exports = router