import Task from '../models/Task.js'
import User from '../models/User.js'


// Create Post
export const createTask = async (req, res) => {
    try {
        const { title, date, address, category, price } = req.body
        const user = await User.findById(req.userId)

        const newTask = new Task({
            title,
            date,
            address,
            category,
            price,
            author: req.userId,
        })
        await newTask.save()
        await User.findByIdAndUpdate(req.userId, {
            $push: { tasks: newTask },
        })
        console.log('title',title)

        console.log('newTask',newTask)
        
        res.json(newTask)
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

// Get All Tasks
export const getAll = async (req, res) => {
    try {
        const tasks = await Task.find().sort('-createdAt')
        const users = await User.find()
        
        if (!tasks) {
            return res.json({ message: 'Заданий нет' })
        }

        res.json({ tasks, users})
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}






