import { Router } from 'express'
import {
    createTask,
    getAll,
   
} from '../controllers/tasks.js'
import { checkAuth } from '../utils/checkAuth.js'
const router = new Router()

// Create Task
// http://localhost:3002/api/tasks
router.post('/', checkAuth, createTask)

// Get All Tasks
// http://localhost:3002/api/tasks
router.get('/', getAll)


export default router
