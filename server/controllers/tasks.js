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

// Get Post By Id
export const getById = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        })
        //console.log('taskAuthor',task.author);
        const user = await User.findOne().where('_id').equals(task.author)
        //console.log('user',user)
        res.json({task, user})
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

// Remove post
export const removeTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) return res.json({ message: 'Такого задания не существует' })

        await User.findByIdAndUpdate(req.userId, {
            $pull: { tasks: req.params.id },
        })

        res.json({ message: 'Задание было удалено.' })
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

// Update post
export const updateTask = async (req, res) => {
    try {
        const { title, cat, price, id, date, address } = req.body
        //console.log(title,'title')
        const task = await Task.findById(id)

        task.title = title
        task.cat = cat
        task.date = date
        task.address = address
        task.price = price
        await task.save()

        res.json(task)
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}




