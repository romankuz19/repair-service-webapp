import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema(
{
//username: { type: String, required: true },
title: { type: String, required: true },
date: {type: String, required: true },
address: {type: String},
category: { type: String, required: true },
price: { type: Number, default: 0 },
views: { type: Number, default: 0 },
author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},
    { timestamps: true },
)
export default mongoose.model('Task', TaskSchema)
