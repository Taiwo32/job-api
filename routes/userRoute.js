const express = require ('express');
const authController = require('./../controllers/authController');
const userController = require ('../controllers/userController');


const router = express.Router();
router.route('/signup')
.post(authController.signUp)
router.post('/login', authController.login);

router.post("/forgetPassword", authController.forgetPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect)//

router.patch(
    "/updateMyPassword",
    authController.protect,
    authController.updatePassword
    
);

router .patch("/updateMe", userController.updateMe);


router.use(authController.restrictTo('admin'));


router.route('/user').get(userController.getAllUsers)       

router.route('/user/:id').get(userController.getOneUserById)
router
.route('/user/:id')
// .patch(userController.updateUser)
.delete(userController.deleteOneUser)



module.exports = router