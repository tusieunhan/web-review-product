import express from 'express'
const router = express.Router()
import { createPostsReport, listPostsReport, deletePostReport } from '../controllers/PostReportController.js'


router.post('/:id', createPostsReport)
router.get('/', listPostsReport)
router.delete('/:id', deletePostReport)


export default router