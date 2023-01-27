import express from 'express'
import userController from '../controller/userController.js'
import postController from '../controller/postController.js'
import auth from '../middlewares/auth.js'
// import commentController from '../controller/commentController.js'
const router= express.Router()


//##############   USER #####################//
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser)
// router.get('/',userController.getAllUser)
// router.get('/:id',userController.getuserById)
// router.put('/user/:id',userController.UpdateUserByID)
// router.delete('/delete/:id',userController.DelUserUserById)



//############### POST ########################//

router.use(auth.checkAutorization);

router.post('/post', postController.createPost);
router.get('/posts/:id', postController.getAllpost);
// router.get('/AllPost/:id',postController.getPostById)
// router.put('/UpdatePost/:id', postController.updatePostById)
router.delete('/Delete/:id',postController.DelPostById)

// ############## Comments ####################//

// router.post('/register',commentController.createComment)
// router.get('/ ',commentController.getAllComment)
// router.get('/getcommentId', commentController.getCommentById)
// router.delete('/delComment',commentController.DelCommentById)






export default router;