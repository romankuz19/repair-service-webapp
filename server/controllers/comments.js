import Comment from '../models/Comment.js'
import Service from '../models/Service.js'

export const createComment = async (req, res) => {
    try {
        const { serviceId, comment, author } = req.body

        if (!comment)
            return res.json({ message: 'Комментарий не может быть пустым' })

        
        //console.log('comment',comment)
        const authorName = author.firstname
        console.log('author',authorName)
        const newComment = new Comment({ comment, authorName, author })
        await newComment.save()
        console.log(newComment)
        //const find = await Comment.find().populate('author')
       // console.log('find.author.firstname',find.author.firstname)
        //const some = Comment.find().populate({ author: author });

        try {
            await Service.findByIdAndUpdate(serviceId, {
                $push: { comments: newComment._id },
            })
            //Comment.populated('author')

           // const some = Comment.findOne({ author: author }).populate('author')
                        
            //console.log('some',some)

        } catch (error) {
            console.log(error)  
        }
        
        
        res.json(newComment)
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}


// Remove service
export const removeComment = async (req, res) => {
    try {
        const {commentId, serviceId} = req.body
        //const commentId = req.body.commentId
        //const  serviceId = req.body.serviceId
        //const com = req.params.id
      
        console.log("commentId",commentId)

        console.log("serviceId",serviceId)
        const comment = await Comment.findByIdAndDelete(commentId)
        if (!comment) return res.json({ message: 'Такого комментария не существует' })

        await Service.findByIdAndUpdate(serviceId, {
            $pull: { comments: commentId },
        })
        

        //console.log("com",com)
        res.json({ message: 'Комментарий был удален.' })
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}