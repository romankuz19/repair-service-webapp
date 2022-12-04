import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema(
    {
        firstUserId: {  type: String, required: true },
        secondUserId: {  type: String, required: true },
        messages: [ {type: String }],
        //messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    },
    { timestamps: true },
)
export default mongoose.model('Chat', ChatSchema)
