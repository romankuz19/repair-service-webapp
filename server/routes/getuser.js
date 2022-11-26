import { Router } from 'express'
import {  getUser } from '../controllers/getuser.js'

const router = new Router()

// Get User
// http://localhost:3002/api/myprofile
router.get('/',  getUser)

export default router