import { Router } from 'express'
import {
    createTask,
    getAll,
    getById
   
} from '../controllers/tasks.js'
import { checkAuth } from '../utils/checkAuth.js'
const router = new Router()

// Create Task
// http://localhost:3002/api/tasks
router.post('/', checkAuth, createTask)

// Get All Tasks
// http://localhost:3002/api/tasks
router.get('/', getAll)

// Get Task By Id
// http://localhost:3002/api/tasks/:id
router.get('/:id', getById)


export default router
