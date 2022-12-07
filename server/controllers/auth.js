import User from '../models/User.js'
import ChatMessage from '../models/ChatMessage.js'
import Comment from '../models/Comment.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Register user
export const register = async (req, res) => {
    try {
        const { username, password, firstname, secondname, city, phonenumber } = req.body

        const isUsed = await User.findOne({ username })

        if (isUsed) {
            return res.json({
                message: 'Данный username уже занят.',
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            password: hash,
            firstname,
            secondname,
            city,
            phonenumber,
        })

        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        await newUser.save()

        res.json({
            newUser,
            token,
            message: 'Регистрация прошла успешно.',
        })
    } catch (error) {
        res.json({ message: 'Ошибка при создании пользователя.' })
    }
}

// Login user
export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        //console.log('user',username, password)
        //console.log('user',user)
        if (!user) {
            //console.log('dasdsadsa',user)
            return res.json({
                message: 'Такого юзера не существует.',
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.json({
                message: 'Неверный пароль.',
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        res.json({
            token,
            user,
            message: 'Вы вошли в систему.',
        })
    } catch (error) {
        res.json({ message: 'Ошибка при авторизации.' })
    }
}

//update user
export const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const userId=req.userId
        console.log('userId',userId)
        
        const { firstname, secondname, city, phonenumber } = req.body

        //console.log('user',user)
        user.firstname = firstname
        user.secondname = secondname
        user.city = city
        user.phonenumber = phonenumber

        await user.save()
        //const msg = await ChatMessage.find().where('senderId').equals(userId)
        //console.log('msgs',msg)
        await ChatMessage.updateMany( {senderId : userId}, { $set: { senderName : firstname } });
        await Comment.updateMany( {author : userId}, { $set: { authorName : firstname } });
        
        // for (var i = 0; i < msg.length; i++){
        //     msg[i].senderName=firstname
        //     console.log('msg name',msg[i].senderName)
        // }
        //await msg.save()
        //console.log('msgs',msg)

        res.json({user, message: 'Даныне успешно изменены.',})


    } catch (error) {
        res.json({ message: 'Ошибка при создании пользователя.' })
    }
}

// Get Me
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.json({
                message: 'Такого юзера не существует.',
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        res.json({
            user,
            token,
        })
    } catch (error) {
        res.json({ message: 'Нет доступа 3.' })
    }
}

