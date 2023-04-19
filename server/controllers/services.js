import Post from '../models/Service.js'
import User from '../models/User.js'
import Comment from '../models/Comment.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

// Create Post
export const createPost = async (req, res) => {
    try {
        const { title, text, category, price } = req.body
        const user = await User.findById(req.userId)

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                category,
                price,
                imgUrl: fileName,
                author: req.userId,
            })

            await newPostWithImage.save()
            await User.findByIdAndUpdate(req.userId, {
                $push: { posts: newPostWithImage },
            })

            return res.json(newPostWithImage)
        }

        const newPostWithoutImage = new Post({
            username: user.username,
            title,
            text,
            category,
            price,
            imgUrl: '149071.png',
            author: req.userId,
        })
        await newPostWithoutImage.save()
        await User.findByIdAndUpdate(req.userId, {
            $push: { posts: newPostWithoutImage },
        })
        res.json(newPostWithoutImage)
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

// Get All Posts
export const getAll = async (req, res) => {
    try {
        const posts = await Post.find().sort('-createdAt')
        const popularPosts = await Post.find().limit(5).sort('-views')
        const users = await User.find()

        //console.log(users)


        // const userid = await Post.find({}).select('author -_id')

        // console.log(userid)
        // var arrObj = userid;
        // var arrstring = JSON.stringify(arrObj)
        // const myArr = JSON.parse(arrstring);

        // var usersid=[]

        // for (var i = 0; i < myArr.length; i++) {
        //     var object = myArr[i];
            
        //     usersid[i]=object.author
        // }
        // console.log(usersid)
        // var users=[]
        // for (var i = 0; i < usersid.length; i++) {
        //     users[i]=await User.find({}).where('_id').equals(usersid[i])
        // }

        // var json1 = Object.assign({}, users);
       
        // console.log(json1)

        // var use =''
        // for (var i = 0; i < usersid.length; i++) {
        //     use.push(users[i])
        // }
        // console.log(use)
        
        if (!posts) {
            return res.json({ message: 'Постов нет' })
        }

        res.json({ posts, popularPosts, users})
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

export const sortedPosts = async (req, res) => {
    try {
        console.log('req.params',req.params.name)
        const sort= req.params.name
        //console.log('sort',sort.sort)
        const s = sort;
        const regex = new RegExp(s, 'i') // i for case insensitive
        //Posts.find({title: {$regex: regex}})
        
    //    const sortedPosts = await Post.find().where('category').equals(sort)
        // const sortedPosts = await Post.find().where('text').equals({sort}+"%")
        const sortedPosts = await Post.find({text: {$regex: regex}})
       console.log('sortedPosts',sortedPosts)
        // const posts = await Post.find().sort('-createdAt')
        // const popularPosts = await Post.find().limit(5).sort('-views')
        // const users = await User.find()

        
        
        if (!sort) {
            return res.json({ message: 'Постов нет' })
        }

        res.json({sortedPosts})
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

// Get Post By Id
export const getById = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        })
        const user = await User.findOne().where('username').equals(post.username)
        //console.log(user)
        res.json({post, user})
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

// Get My Posts
export const getMyPosts = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const list = await Promise.all(
            user.posts.map((post) => {
                return Post.findById(post._id)
            }),
        )


        //console.log(list,user)
        res.json({list,user})
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

// Remove post
export const removePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        if (!post) return res.json({ message: 'Такой услуги не существует' })

        await User.findByIdAndUpdate(req.userId, {
            $pull: { posts: req.params.id },
        })

        res.json({ message: 'Услуга была удалена.' })
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

// Update post
export const updatePost = async (req, res) => {
    try {
        const { title, text, category, price, id } = req.body
        const post = await Post.findById(id)

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
            post.imgUrl = fileName || ''
        }

        post.title = title
        post.text = text
        post.category = category
        post.price = price
        await post.save()

        res.json(post)
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

// Get Post Comments
export const getPostComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const list = await Promise.all(
            post.comments.map((comment) => {
                return Comment.findById(comment)
            }),
        )
        res.json(list)
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}
