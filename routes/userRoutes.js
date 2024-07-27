import { login, registerUser } from "../controller/userController.js"
import express from 'express'

const router = express.Router()
router.post('/register', registerUser)
router.get('/login', login)

export default router