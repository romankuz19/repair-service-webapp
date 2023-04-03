import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import postSlice from './features/post/postSlice'
import commentSlice from './features/comment/commentSlice'
import taskSlice from './features/task/taskSlice'
import chatSlice from './features/chat/chatSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice,
        comment: commentSlice,
        task: taskSlice,
        chat: chatSlice,
    },
})
