import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    messages: [],
    loading: false,
}

export const createChat = createAsyncThunk(
    'chat/createChat',
    async ({firstUserId, secondUserId}) => {
        try {
            console.log('firstUserId', firstUserId)
            console.log('secondUserId', secondUserId)
            const { data } = await axios.post(`/chat/create`, {
                firstUserId,
                secondUserId,
            })
            console.log(data)
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

// export const createMessage = createAsyncThunk(
//     'chat/createMessage',
//     async ({chatId,senderId,senderName,message}) => {
//         console.log('chatId',chatId)
//         console.log('message',message)
//         try {
//             const { data } = await axios.post(`/messages/`, {
//                 chatId,
//                 senderId,
//                 senderName,
//                 message
//             })
//             console.log('data',data)
//             return data
//         } catch (error) {
//             console.log(error)
//         }
//     },
// )

export const getChatMessages = createAsyncThunk(
    'chat/getChatMessages',
    async (chatId) => {
        try {
            const { data } = await axios.get(`/messages/${chatId}`)
            //console.log('data',data)
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
    extraReducers: {
        // Создание chat
        [createChat.pending]: (state) => {
            state.loading = true
        },
        [createChat.fulfilled]: (state, action) => {
            state.loading = false
            //state.users = action.payload;

        },
        [createChat.rejected]: (state) => {
            state.loading = false
        },

        // [createMessage.pending]: (state) => {
        //     state.loading = true
        // },
        // [createMessage.fulfilled]: (state, action) => {
        //     state.loading = false
        //     state.messages.push(action.payload)
        // },
        // [createMessage.rejected]: (state) => {
        //     state.loading = false
        // },
        // Получение сообщений
        [getChatMessages.pending]: (state) => {
            state.loading = true
        },
        [getChatMessages.fulfilled]: (state, action) => {
            state.loading = false
            state.messages = action.payload.messages
            //state.posts = action.payload.posts
        },
        [getChatMessages.rejected]: (state) => {
            state.loading = false
        },
    },
})

export default chatSlice.reducer
