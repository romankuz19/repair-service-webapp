import Chat from '../models/Chat.js'
import ChatMessage from '../models/ChatMessage.js'

export const addMessage = async (req, res) => {
    try {
        const { chatId, senderId, senderName, message } = req.body
        if (!message){return res.json({ message: 'Сообщение не может быть пустым' })}
        const newMessage = new ChatMessage({
            chatId,
            senderId,
            senderName,
            message
        })
        
        await newMessage.save()
        //console.log('newmessage',newMessage.message)
        try {
            await Chat.findByIdAndUpdate(chatId, {
                $push: { messages: newMessage.message },
            })
        } catch (error) {
            console.log(error)
        }
        res.json(newMessage)

        
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

export const getMessages = async (req, res) => {
    try {
        const {chatId} = req.params
       // console.log(chatId)
        const result = await ChatMessage.find({chatId})
        //console.log(result)
        res.json(result)
        
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

