import Post from '../models/Service.js'
import User from '../models/User.js'
import Comment from '../models/Comment.js'
import Review from '../models/Review.js'
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
       
        // var limitValue = 3;
        // const page = req.params.page
        // const id = req.params.id
        // console.log('page',page)
        // console.log('id',id)
        
        
        // var services;
        // if(page == 1){
        //      services = await Post.find().limit(limitValue).sort('-createdAt');
        // }
        // else if (page > 1){
        //      services = await Post.find().skip(limitValue*(page-1)).limit(limitValue).sort('-createdAt');
        // }
        // const count = (await Post.find().sort('-createdAt')).length
        const popularPosts = await Post.find().limit(5).sort('-views')

        // console.log('count',pageQty)

        // const pageQty = Math.ceil(count/limitValue);
        
        //console.log('services', services)
        //console.log('services2', services2)
        const posts = await Post.find().sort('-createdAt');
        const users = await User.find()

        for (let index = 0; index < posts.length; index++) {
           
            var allReviews = Array();
            for (const item of posts[index].reviews) {
                var contents = await Review.findById(item.valueOf());
                allReviews.push(contents.rating);
                //console.log("item",item.valueOf())
            }
            
            let totalRating = 0;
    
            allReviews.forEach(element => {
                totalRating+=element;
            });
    
           
            var avgRating = totalRating/allReviews.length;
            
            

            posts[index].rating = avgRating
            //console.log("post",posts[index])
        };
        // console.log("posts",posts)

        

        
        if (!posts) {
            return res.json({ message: 'Постов нет' })
        }

        res.json({ posts, popularPosts, users})
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

export const sortedServicesCat = async (req, res) => {
    const categoriesList = [
       
        {
            id: 1,
            value: 'Бытовые услуги'
        } , {
            id: 2,
            value: 'Цифровая техника'
        }, {
            id: 3,
            value: 'Транспорт'
        },
        {
            id: 4,
            value: 'Ремонт и строительство'
        },
       
        ];

        const arr = req.params.name.split(' ');
        //console.log('arr',arr)
        const newArr = Array();
        const sortedServicesCat = Array();

        categoriesList.forEach(element => {
            for (let i = 0; i < arr.length; i++) {
                console.log(arr[i])
                if (element.value.indexOf(arr[i])!==-1 && arr[i]!=='и') {
                    newArr.push(element.value)
                    break;
                }
              }
        });

        for (const item of newArr){
            var tmp = await Post.find({category: item})
            if(tmp.length!==0)  sortedServicesCat.push(tmp)
            
        }
        // console.log('newArr',newArr)
        // console.log('sort',sortedServicesCat)
        if(sortedServicesCat.length==0){
            console.log('aaa')
            return res.json({ message: 'Постов нет' })
        }

        res.json({sortedServicesCat})

}


export const sortedServices = async (req, res) => {
    try {
        
        console.log('req.params',req.params)
       
        const sort= req.params.name
    
        const s = sort;
        const regex = new RegExp(s, 'i') // i for case insensitive
        
        const sortedServices = await Post.find({text: {$regex: regex}})

        for (let index = 0; index < sortedServices.length; index++) {
           
            var allReviews = Array();
            for (const item of sortedServices[index].reviews) {
                var contents = await Review.findById(item.valueOf());
                allReviews.push(contents.rating);
                //console.log("item",item.valueOf())
            }
            
            let totalRating = 0;
    
            allReviews.forEach(element => {
                totalRating+=element;
            });
    
           
            var avgRating = totalRating/allReviews.length;
            
            

            sortedServices[index].rating = avgRating
            //console.log("post",posts[index])
        };
       
        
        if (!sort) {
            return res.json({ message: 'Постов нет' })
        }
      
        res.json({sortedServices})

        
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

// Get Post By Id
export const getById = async (req, res) => {
    try {
        console.log("req.params",req.params)
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        })
        var allReviews = Array();
        
        for (const item of post.reviews) {
            var contents = await Review.findById(item.valueOf());
            allReviews.push(contents.rating);
            //console.log("item",item.valueOf())
        }
        
        let totalRating = 0;

        allReviews.forEach(element => {
            totalRating+=element;
        });

       
        var avgRating = totalRating/allReviews.length;
          
        //console.log("avgRating",avgRating)

        const user = await User.findOne().where('username').equals(post.username)
        //console.log(user)
        
        let rating = avgRating.toFixed(2);
        
        res.json({post, user, rating})
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
        for (let index = 0; index < list.length; index++) {
           
            var allReviews = Array();
            for (const item of list[index].reviews) {
                var contents = await Review.findById(item.valueOf());
                allReviews.push(contents.rating);
                //console.log("item",item.valueOf())
            }
            
            let totalRating = 0;
    
            allReviews.forEach(element => {
                totalRating+=element;
            });
    
           
            var avgRating = totalRating/allReviews.length;
            
            

            list[index].rating = avgRating
            //console.log("post",posts[index])
        };


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

// Get Post Reviews
export const getServiceReview = async (req, res) => {
    try {
        const service = await Post.findById(req.params.id)
        const list = await Promise.all(
            service.reviews.map((review) => {
                return Review.findById(review)
            }),
        )
        const authors = await Promise.all(
            list.map((review) =>{
                return User.findById(review.author.valueOf())
            }),
        )
        //console.log("authors",authors)

        res.json({list, authors})
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

