import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
{
username: {type: String,required: true, unique: true,},
password: {type: String,required: true,},
firstname: {type: String, default: ''},
secondname: {type: String,default: ''},
city: {type: String,default: '' },
phonenumber: {type: Number, unique: true, default: ''},
admin: {type: Boolean, default: false },
secretQuestion: {type: String, required: true, default: ''},
secretQuestionAnswer: {type: String, required: true, default: ''},
// online: {type: Boolean, default: false },
posts: [{type: mongoose.Schema.Types.ObjectId,ref: 'Post',},],
tasks: [{type: mongoose.Schema.Types.ObjectId,ref: 'Task',},],
},
    { timestamps: true },
)

export default mongoose.model('User', UserSchema)
