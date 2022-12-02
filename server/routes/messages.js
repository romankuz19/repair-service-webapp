import { Router } from 'express'
import { checkAuth } from '../utils/checkAuth.js'
import { addMessage,getMessages } from '../controllers/messages.js'

const router = new Router()
// Create Chat
// http://localhost:3002/api/messages/
router.post('/', 
///checkAuth,
 addMessage)
 
router.get('/:chatId', getMessages)
export default router
