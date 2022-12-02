import mongoose from 'mongoose'

const ChatMessageSchema = new mongoose.Schema(
    {
        chatId: { type: String },
        senderId: {type: String},
        senderName: {type: String},
        message: { type: String, required: true },
    },
    { timestamps: true },
)
export default mongoose.model('ChatMessage', ChatMessageSchema)
