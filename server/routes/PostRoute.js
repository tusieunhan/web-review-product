import express from 'express'
import { createPost, deletePost, getListPost, getPost, getTimelinePosts, likePost, updatePost, getListPostUser } from '../controllers/PostController.js'
import authMiddleWare from '../middleware/AuthMiddleware.js'
const router = express.Router()

router.post('/', createPost)
router.get('/', getListPost)
router.get('/list/:id', getListPostUser)
router.get('/:id', getPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.post('/like', likePost)
router.get('/:id/timeline', getTimelinePosts)

export default router