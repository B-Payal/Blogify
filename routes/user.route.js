const express = require('express');
const router = express.Router();
const userController = require('../controllers/User.controller');
const {body} = require('express-validator');


const validationRules = [
    body('username').notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("must be an email"),
    body("password").isLength({min:6}).withMessage("must be of atleast 6 characters")
]

router.get('/' , userController.getUser);
router.get('/:id' , userController.getUserById);
router.post('/register' , validationRules , userController.registerUser);
router.patch('/:id' , userController.updateUser);
router.delete('/:id' , userController.deleteUser);
router.post('/forgotPassword' , userController.forgot);
router.post('/reset/:token' , userController.reset);


module.exports = router;