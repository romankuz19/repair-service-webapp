import { Router } from 'express'
import {
    createPost,
    getAll,
    getById,
    getMyPosts,
    removePost,
    updatePost,
    getPostComments,
    sortedServices,
    sortedServicesCat,
    getServiceReview
    
} from '../controllers/services.js'
import { checkAuth } from '../utils/checkAuth.js'
const router = new Router()

// Create Post
// http://localhost:3002/api/posts
router.post('/', checkAuth, createPost)

// Create Post
// http://localhost:3002/api/posts
router.get('/:page', getAll)

// Get All Posts
// http://localhost:3002/api/posts
router.get('/', getAll)

// Get sorted Posts
// http://localhost:3002/api/posts/sorted/cat/:name
router.get('/sorted/cat/:name', sortedServicesCat)


// Get sorted Posts
// http://localhost:3002/api/posts/sorted/:name
router.get('/sorted/:name', sortedServices)

// Get Post By Id
// http://localhost:3002/api/posts/:id
router.get('/:id', getById)

// Update Post
// http://localhost:3002/api/posts/:id
router.put('/:id', checkAuth, updatePost)

// Get My Posts
// http://localhost:3002/api/posts/user/me
router.get('/user/me', checkAuth, getMyPosts)

// Remove Post
// http://localhost:3002/api/posts/:id
router.delete('/:id', checkAuth, removePost)

// Get Post Comments
// http://localhost:3002/api/posts/comments/:id
router.get('/comments/:id', getPostComments)

// Get Post Reviews
// http://localhost:3002/api/posts/reviews/:id
router.get('/reviews/:id', getServiceReview)

export default router
