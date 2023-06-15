import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
{
username: { type: String, required: true },
title: { type: String, required: true },
text: { type: String, required: true, index: true},
category: { type: String, required: true },
imgUrl: { type: String, default: '' },
price: { type: Number, default: 0 },
views: { type: Number, default: 0 },
rating: {type: Number, default: 0},
author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
},
    { timestamps: true },
)
export default mongoose.model('Post', PostSchema)
