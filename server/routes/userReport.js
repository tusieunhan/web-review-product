import express from 'express'
const router = express.Router()
import { createUserReport, listUserReport, deleteUserReport } from '../controllers/userReportController.js'

router.post('/:id', createUserReport)
router.get('/', listUserReport)
router.delete('/:id', deleteUserReport)


export default router