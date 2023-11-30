const router = require("express").Router();
const jobController = require("../controllers/jobController");
let {verifyAndAuthorize , verifyToken, verifyAndAdmin} = require("../middleware/verifyToken")

// POST JOB
router.post("/",verifyAndAdmin,jobController.createJob);

// UPDATE JOB
router.put("/:id",verifyAndAdmin,jobController.updateJob);


// // DELETE JOB
router.delete("/:id",verifyAndAdmin,jobController.deleteJob)

// GET JOB
router.get("/:id",jobController.getJob)

// // GET All JOBS
// router.get("/",jobController.getAllJobs)

// SEARCH JOBS
// router.get("/search/:key",jobController.searchJobs)




module.exports = router