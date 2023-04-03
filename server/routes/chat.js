import { Router } from 'express'
import { checkAuth } from '../utils/checkAuth.js'
import { createChat, getChats } from '../controllers/chat.js'

const router = new Router()
// Create Chat
// http://localhost:3002/api/chat/create (id of the chat creator, not owner of the service)
router.post('/create', 
 checkAuth,
 createChat)

 // Get Chats
// http://localhost:3002/api/chat/getchats
router.get('/getchats', checkAuth, getChats)

//  // Get Chat Messages
// // http://localhost:3002/api/chat/:id (id of the chat creator, not owner of the service)
// router.post('/', 
// ///checkAuth,
//  createChat)

export default router
