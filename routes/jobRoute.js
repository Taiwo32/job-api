const express = require ('express');
const jobController = require ('./../controllers/jobController');
const authController = require ('../controllers/authController')

const router = express.Router()

router.route('/job')
.get(jobController.getAllJobs)
.post(authController.protect, jobController.createJob, authController.restrictTo("hr","admin"))
router
.route('/job/:id')
.patch(
    authController.protect,
    jobController.updateJob,
    authController.restrictTo("admin", "hr"))
.delete(jobController.deleteJob);

router
.route('/job/:id').get(
    authController.protect,
    authController.restrictTo("admin", "hr"),
    jobController.getOneJob)


module.exports = router;
