import { Router } from 'express'
import {
    createTask,
    getAll,
    getById,
    getMyTasks,
    removeTask,
    updateTask,
    sortedTasks,
    cancelTask,
    completeTask,
    responseTask
   
} from '../controllers/tasks.js'
import { checkAuth } from '../utils/checkAuth.js'
const router = new Router()

// Create Task
// http://localhost:3002/api/tasks
router.post('/', checkAuth, createTask)

// Get All Tasks
// http://localhost:3002/api/tasks
router.get('/', getAll)

// Get sorted Tasks
// http://localhost:3002/api/tasks/sorted/:name
router.get('/sorted/:name', sortedTasks)

// Get My Tasks
// http://localhost:3002/api/tasks/user/me
router.get('/user/me', checkAuth, getMyTasks)

// Get Task By Id
// http://localhost:3002/api/tasks/:id
router.get('/:id', getById)

// Update Task
// http://localhost:3002/api/tasks/:id
router.put('/:id', checkAuth, updateTask)

// Remove Task
// http://localhost:3002/api/tasks/:id
router.delete('/:id', checkAuth, removeTask)

// Cancel Task
// http://localhost:3002/api/tasks/:id
router.patch('/:id/status_cancel', checkAuth, cancelTask)
// Complete Task
// http://localhost:3002/api/tasks/:id
router.patch('/:id/status_complete', checkAuth, completeTask)

// Task responses increment 
// http://localhost:3002/api/tasks/:id
router.patch('/:id', checkAuth, responseTask)



export default router
