import express from 'express'
const router = express.Router()
import { createUserReport, listUserReport, deleteUserReport, addRole } from '../controllers/userReportController.js'

router.post('/:id', createUserReport)
router.post('/role/:id', addRole)
router.get('/', listUserReport)
router.delete('/:id', deleteUserReport)


export default router