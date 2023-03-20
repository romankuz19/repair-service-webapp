import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    tasks: [],
    users: null,
    loading: false,
}

export const createTask = createAsyncThunk(
    'task/createTask',
    async (params) => {
        try {
            const { data } = await axios.post('/tasks', params)
            console.log('dataTaskSlice', data)
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const getAllTasks = createAsyncThunk('task/getAllTasks', async () => {
    try {
        const { data } = await axios.get('/tasks')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const removePost = createAsyncThunk('post/removePost', async (id) => {
    try {
        const { data } = await axios.delete(`/posts/${id}`, id)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const updatePost = createAsyncThunk(
    'post/updatePost',
    async (updatedPost) => {
        try {
            const { data } = await axios.put(
                `/posts/${updatedPost.id}`,
                updatedPost,
            )
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers: {
        // Создание поста
        [createTask.pending]: (state) => {
            state.loading = true
        },
        [createTask.fulfilled]: (state, action) => {
            state.loading = false
            state.tasks.push(action.payload)
        },
        [createTask.rejected]: (state) => {
            state.loading = false
        },
        // Получение всех постов
        [getAllTasks.pending]: (state) => {
            state.loading = true
        },
        [getAllTasks.fulfilled]: (state, action) => {
            state.loading = false
            state.tasks = action.payload.tasks
            state.users = action.payload.users
        },
        [getAllTasks.rejected]: (state) => {
            state.loading = false
        },
        // Удаление поста
        [removePost.pending]: (state) => {
            state.loading = true
        },
        [removePost.fulfilled]: (state, action) => {
            state.loading = false
            state.posts = state.posts.filter(
                (post) => post._id !== action.payload._id,
            )
        },
        [removePost.rejected]: (state) => {
            state.loading = false
        },
        // Обновление поста
        [updatePost.pending]: (state) => {
            state.loading = true
        },
        [updatePost.fulfilled]: (state, action) => {
            state.loading = false
            const index = state.posts.findIndex(
                (post) => post._id === action.payload._id,
            )
            state.posts[index] = action.payload
        },
        [updatePost.rejected]: (state) => {
            state.loading = false
        },
    },
})

export default taskSlice.reducer
