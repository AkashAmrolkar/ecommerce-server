import { addUser } from "../controller/userController.js"
import express from 'express'

const router = express.Router()
router.post('/adduser', addUser)

export default router