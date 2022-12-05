import mongoose from 'mongoose'

const ChatMessageSchema = new mongoose.Schema(
{
chatId: { type: String, required: true },
senderId: {type: String, required: true},
senderName: {type: String, required: true},
message: { type: String, required: true },
},
    { timestamps: true },
)
export default mongoose.model('ChatMessage', ChatMessageSchema)
