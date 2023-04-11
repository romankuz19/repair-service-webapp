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

export const removeTask = createAsyncThunk('task/removeTask', async (id) => {
    try {
        const { data } = await axios.delete(`/tasks/${id}`, id)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const updateTask = createAsyncThunk(
    'task/updateTask',
    async (updatedTask) => {
        try {
            const { data } = await axios.put(
                `/tasks/${updatedTask.id}`,
                updatedTask,
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
        [removeTask.pending]: (state) => {
            state.loading = true
        },
        [removeTask.fulfilled]: (state, action) => {
            state.loading = false
            state.tasks = state.tasks.filter(
                (task) => task._id !== action.payload._id,
            )
        },
        [removeTask.rejected]: (state) => {
            state.loading = false
        },
        // Обновление taska
        [updateTask.pending]: (state) => {
            state.loading = true
        },
        [updateTask.fulfilled]: (state, action) => {
            state.loading = false
            const index = state.tasks.findIndex(
                (task) => task._id === action.payload._id,
            )
            state.tasks[index] = action.payload
        },
        [updateTask.rejected]: (state) => {
            state.loading = false
        },
    },
})

export default taskSlice.reducer
