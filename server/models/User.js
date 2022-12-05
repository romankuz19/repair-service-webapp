import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
{
username: {type: String,required: true, unique: true,},
password: {type: String,required: true,},
firstname: {type: String, default: ''},
secondname: {type: String,default: ''},
city: {type: String,default: '' },
phonenumber: {type: Number,default: ''},
admin: {type: Boolean, default: false },
posts: [{type: mongoose.Schema.Types.ObjectId,ref: 'Post',},],
},
    { timestamps: true },
)

export default mongoose.model('User', UserSchema)
