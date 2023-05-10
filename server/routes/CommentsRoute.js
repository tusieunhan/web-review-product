import express from 'express'
import { createComment, getComment } from '../controllers/CommentsControlllers.js'

const router = express.Router()

router.post('/', createComment)
router.get('/:id', getComment)

export default router