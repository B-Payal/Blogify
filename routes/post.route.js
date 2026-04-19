const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const auth = require('../middlewares/authMiddleware')
const {canEditPost , minRoleRequired , hasPermission} = require('../middlewares/authZmiddleware')


router.get('/' , postController.getPost);
router.get('/:id' , postController.getPostById);


router.post('/', auth ,  postController.createPost);
router.patch('/:id' , auth , canEditPost ,   postController.updatePost);
router.delete('/:id' ,  auth  , hasPermission('delete:posts') , postController.deletePost);

module.exports = router;

