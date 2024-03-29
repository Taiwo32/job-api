const express = require ('express');
const jobController = require ('./../controllers/jobController');

const router = express.Router()

router.route('/job')
.get(jobController.getAllJobs)
.post(jobController.createJob)
router
.route('/job/:id')
.patch(jobController.updateJob)
.delete(jobController.deleteJob);

router
.route('/job/:id').get(jobController.getOneJob)


module.exports = router;
