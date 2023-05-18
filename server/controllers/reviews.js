import Review from '../models/Review.js'
import Service from '../models/Service.js'

export const createReview = async (req, res) => {
    try {
        const { reviewId, text, rating, author } = req.body
        //console.log(req.body)

        if (!text)
            return res.json({ message: 'Отзыв не может быть пустым' })

        if (!rating)
            return res.json({ message: 'Отзыв не может без оценки' })

        const newReview = new Review({ text, rating, author })
        await newReview.save()
        console.log(newReview)
        //const find = await Comment.find().populate('author')

        //console.log('find.author.firstname',find.author.firstname)

        //const some = Comment.find().populate({ author: author });

        try {
            await Service.findByIdAndUpdate(reviewId, {
                $push: { reviews: newReview._id },
            })
            //Comment.populated('author')

           // const some = Comment.findOne({ author: author }).populate('author')
                        
            //console.log('some',some)

        } catch (error) {
            console.log(error)  
        }
        
        
        res.json(newReview)
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}


// Remove service
// export const removeComment = async (req, res) => {
//     try {
//         const {commentId, postId} = req.body
//         //const commentId = req.body.commentId
//         //const  serviceId = req.body.serviceId
//         //const com = req.params.id
      
//         console.log("commentId",commentId)

//         console.log("postId",postId)
//         const comment = await Comment.findByIdAndDelete(commentId)
//         if (!comment) return res.json({ message: 'Такого комментария не существует' })

//         await Service.findByIdAndUpdate(postId, {
//             $pull: { comments: commentId },
//         })
        

//         //console.log("com",com)
//         res.json({ message: 'Комментарий был удален.' })
//     } catch (error) {
//         res.json({ message: 'Что-то пошло не так.' })
//     }
// }