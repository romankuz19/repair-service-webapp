import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema(
{
text: { type: String, required: true },
rating: {type: Number, required: true},
author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},
    { timestamps: true },
)
export default mongoose.model('Review', ReviewSchema)
