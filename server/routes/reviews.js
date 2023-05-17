import { Router } from 'express'
import { checkAuth } from '../utils/checkAuth.js'
import { createReview, 
    // removeReview
 } from '../controllers/reviews.js'

const router = new Router()
// Create Review
// http://localhost:3002/api/reviews/:id
router.post('/:id', 
// checkAuth, 
createReview)

// http://localhost:3002/api/comments/:id
// router.delete('/',
//  //checkAuth, 
//  removeReview)

export default router
