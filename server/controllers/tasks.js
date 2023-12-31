import Service from '../models/Service.js'
import Task from '../models/Task.js'
import User from '../models/User.js'


// Create Post
export const createTask = async (req, res) => {
    try {
        const { title, date, description, address, category, price } = req.body
        const user = await User.findById(req.userId)

        const newTask = new Task({
            title,
            description,
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
        // const tasks = await Task.find().where('status').equals('opened').sort('-createdAt')
        const tasks = await Task.find({status: 'opened'}).sort('-createdAt')
        const users = await User.find()
        const some = await Task.find().sort('-createdAt')
        if (!tasks) {
            return res.json({ message: 'Заданий нет' })
        }

       
        console.log("some",some)
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
        // const user = await User.findOne().where('_id').equals(task.author)
        const user = await User.findOne({_id:task.author})
        //console.log('user',user)
        res.json({task, user})
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

export const getMyTasks = async (req, res) => {
    try {

        const user = await User.findById(req.userId)
        //console.log('user',user)
        const list = await Promise.all(
            user.tasks.map((task) => {
                return Task.findById(task._id)
            }),
        )



        //console.log(list,user)
        res.json({list,user})
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

// Remove post
export const cancelTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, {status: 'canceled'}, {
            new: true
          })
        if (!task) return res.json({ message: 'Такого задания не существует' })
        console.log('task',task)

        

        res.json({ message: 'Задание было отменено.' })
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

// Remove post
export const completeTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, {status: 'completed'}, {
            new: true
          })
        if (!task) return res.json({ message: 'Такого задания не существует' })
        console.log('task',task)

        

        res.json({ message: 'Задание было отменено.' })
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}


// Update post
export const updateTask = async (req, res) => {
    try {
        const { title, description, cat, price, id, date, address } = req.body
        //console.log(title,'title')
        const task = await Task.findById(id)

        task.title = title
        task.description=description
        task.cat = cat
        task.date = date
        task.address = address
        task.price = price
        task.status = 'opened'
        await task.save()

        res.json(task)
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}


export const sortedTasks = async (req, res) => {
    try {
        
        console.log('req.params',req.params)
       
        const sort= req.params.name
    
        const s = sort;
        const regex = new RegExp(s, 'i') // i for case insensitive
        
        const sortedTasks = await Task.find({title: {$regex: regex}, status: 'opened'})
       
        
        if (!sort) {
            return res.json({ message: 'Заданий нет' })
        }
      
        res.json({sortedTasks})

        
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}


// Task response post
export const responseTask = async (req, res) => {
    try {
          const task = await Task.findByIdAndUpdate(req.params.id, {
            $inc: { responses: 1 },
        })
        if (!task) return res.json({ message: 'Такого задания не существует' })
        console.log('task',task)

        

        res.json({ message: 'Вы откликнулись' })
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}


