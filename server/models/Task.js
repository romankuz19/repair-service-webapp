import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema(
{
//username: { type: String, required: true },
title: { type: String, required: true },
description: { type: String, },
date: {type: String, required: true },
address: {type: String},
category: { type: String, required: true },
price: { type: Number, default: 0 },
responses: {type: Number, default: 0},
status: {type: String, default: 'opened'},
views: { type: Number, default: 0 },
author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},
    { timestamps: true },
)
export default mongoose.model('Task', TaskSchema)
