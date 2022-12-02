import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema(
    {
        firstUserId: {  type: String },
        secondUserId: {  type: String },
        messages: [  {type: String }],
        //messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    },
    { timestamps: true },
)
export default mongoose.model('Chat', ChatSchema)
