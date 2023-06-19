import User from '../models/User.js'
import ChatMessage from '../models/ChatMessage.js'
import Comment from '../models/Comment.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Register user
export const register = async (req, res) => {
    try {
        const { username, password, firstname, secondname, city, phoneNumber, secretQuestion, secretQuestionAnswer } = req.body

        const isUsed = await User.findOne({ username })

        if (isUsed) {
            return res.json({
                message: 'Данный username уже занят.',
            })
        }

        // var phonenumber = phoneNumber.slice(1);
        var phonenumber = phoneNumber;

        console.log(phonenumber)

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            password: hash,
            firstname,
            secondname,
            city,
            phonenumber,
            secretQuestion,
            secretQuestionAnswer,
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
        // user.online = true;
        // user.save();

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        //console.log(isPasswordCorrect)
        


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
            { expiresIn: '1d' },
        )
        

        res.json({
            token,
            user,
            //message: 'Вы вошли в систему.',
        })
    } catch (error) {
        res.json({ message: 'Ошибка при авторизации.' })
    }
}

//update user
export const updateUser = async (req, res) => {
    try {
        const userId=req.userId
        const user = await User.findById(req.userId)
        
        console.log('req.body',req.body)
        
        const { firstname, secondname, city, phonenumber } = req.body

        

        //console.log('user',user)
        user.firstname = firstname
        user.secondname = secondname
        user.city = city
        user.phonenumber = phonenumber
       // console.log('user',user)

        user.markModified("firstname")
       // console.log('111')
        await user.save()

        //console.log('fsdfdsfds')
        
        //const msg = await ChatMessage.find().where('senderId').equals(userId)
        //console.log('msgs',msg)
        await ChatMessage.updateMany( {senderId : userId}, { $set: { senderName : firstname } });
        //await Review.updateMany( {author : userId}, { $set: { authorName : firstname } });
        
        // for (var i = 0; i < msg.length; i++){
        //     msg[i].senderName=firstname
        //     console.log('msg name',msg[i].senderName)
        // }
        //await msg.save()
        //console.log('msgs',msg)

        res.json({user, message: 'Данные успешно изменены.',})


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


//update user
export const recoveryCheckUserExist = async (req, res) => {
    try {

        const { usernameOrNumber } = req.body

        console.log(req.body);
        var user = await User.findOne({ username: usernameOrNumber })

        if (!user)
        {
            user = await User.findOne({ phonenumber: usernameOrNumber })
        }
        //console.log(req.body);

        console.log('user',user)
       
       
        res.json({user})


    } catch (error) {
        res.json({ message: 'Ошибка' })
    }
}


//update user
export const secretQuestionValidation = async (req, res) => {
    try {

        const { userId, secretQuestionAnswer } = req.body

        console.log(req.body);
        const user = await User.findById(userId)
        

        if (!user)
        {
            res.json({ message: 'Ошибка'})
        }
        if(user.secretQuestionAnswer.toLowerCase() === secretQuestionAnswer.toLowerCase()){
            console.log('Все правильно')
            res.json(true)

        }
        else res.json(false)


    } catch (error) {
        res.json({ message: 'Ошибка' })
    }
}


export const changePasswordRecovery = async (req, res) => {
    try {
        const { userId, password } = req.body

        console.log(req.body)
        
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const user = await User.findById(userId)
        
        user.password = hash
        
        await user.save()

        res.json({message: 'Пароль успешно изменен.'})

    } catch (error) {
        res.json({ message: 'Ошибка' })
    }
}


export const changePassword = async (req, res) => {
    try {
        const { userId, password, passwordOld } = req.body
        const user = await User.findById(userId)

        console.log(passwordOld)
       
        const isPasswordCorrect = await bcrypt.compare(passwordOld, user.password)
        
        console.log(isPasswordCorrect)

        if (!isPasswordCorrect) {
            return res.json({
                message: 'Неверный пароль.',
            })
        }
        else{
            
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
    
            
            
            user.password = hash
            
            await user.save()
    
            res.json({message: 'Пароль успешно изменен.'})
        }
        
    
    } catch (error) {
        res.json({ message: 'Ошибка' })
    }
}


export const getAdminId = async (req, res) => {
    try {
    
        const user = await User.findOne({ admin: "true" })

       
        res.json(user)
        
        
    
    } catch (error) {
        res.json({ message: 'Ошибка' })
    }
}

