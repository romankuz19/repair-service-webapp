import React from 'react'
import {
    AiTwotoneEdit,
    AiFillDelete,
} from 'react-icons/ai'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import {  useParams } from 'react-router-dom'
import axios from '../utils/axios'
import { toast } from 'react-toastify'
import Moment from 'react-moment'
import { FcRating } from "react-icons/fc";

    

export const CommentItem = ({ review, currentUser }) => {
    //const avatar = cmt.comment.trim().toUpperCase().split('').slice(0, 2)
    //console.log("cmt",cmt)
    const params = useParams()
    var isAdmin = false;
    const serviceId = params.id
    if(currentUser){
        if(currentUser.admin){
            isAdmin=true
        }
    }


    // const removeComment = async () => {
    //     try {
    //         //console.log('commentId',cmt._id)
    //        // console.log('postId',postId)
    //         const { data } = await axios.delete(`/comments/`, { data: {
    //             commentId: cmt._id,
    //             postId: postId
    //         }  
    //         })
    //         //('https://httpbin.org/delete', { data: { answer: 42 } })
    //         //console.log('data',data.message)
    //         // dispatch(removePost(params.id))
    //         toast('Комментарий был удален')
    //         // navigate('/')
    //         window.location.reload(false);
    //     } catch (error) {
    //         console.log(error)
    //     }
        
    // }

    const removeReview = async () => {
        try {
            //console.log('commentId',cmt._id)
           // console.log('postId',postId)
            const { data } = await axios.delete(`/reviews`, { data: {
                reviewId: review._id,
                serviceId: serviceId
            }})
            
            toast.info('Отзыв был удален')
            // navigate('/')
            window.location.reload(false);
        } catch (error) {
            console.log(error)
        }
        
    }
    
    //console.log('cmt.comment',cmt.comment, 'cmt.id', cmt._id)
    // console.log('cmt.author',cmt.author)
    // console.log('curUser',currentUser._id)
    // console.log('isAdmin',isAdmin)
    // console.log(review.author === currentUser?._id)
    console.log(isAdmin || review.author === currentUser?._id)
    
    return (
        
        <div className='flex justify-between items-center pt-2'>
           
            <div className='left'>
                <div className='flex text-black font-bold text-[16px]'>{review.authorName}</div>
                <div className='flex text-black text-[14px] break-all font-sans'>{review.text} </div>
            </div>
            <div className='right'>
            {(isAdmin || review.author === currentUser?._id) 
            ? 
            (<>
            <Rating name="read-only" value={review.rating} readOnly />
                <div className='flex justify-between'>
                        <div>
                            <span className='text-right pt-1'><Moment locale="ru" date={review.createdAt} format='D MMM YYYY' /></span>
                        </div>
                        {(isAdmin === true || review.author === currentUser?._id) && (
                            <div className='flex'>


                                <div className='flex gap-3'>
                                   
                                    <button
                                        onClick={removeReview}
                                        className='flex items-center justify-center gap-2  text-black opacity-80'
                                    >
                                        <AiFillDelete />
                                    </button>
                                </div>


                            </div>
                        )}
                    </div>
                    </>
            )
            :
            (<>
                    <Rating name="read-only" value={review.rating} readOnly />
                    <div className='flex items-center justify-center'>
                        <div>
                            <span className='text-right pt-1'><Moment locale="ru" date={review.createdAt} format='D MMM YYYY' /></span>
                        </div>
                       
                    </div>
            </>)}
                
                
            </div>
 
        </div>
    )
}
