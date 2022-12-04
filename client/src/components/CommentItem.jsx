import React from 'react'
import {
    AiTwotoneEdit,
    AiFillDelete,
} from 'react-icons/ai'
import {  useParams } from 'react-router-dom'
import axios from '../utils/axios'
import { toast } from 'react-toastify'
    

export const CommentItem = ({ cmt, currentUser }) => {
    //const avatar = cmt.comment.trim().toUpperCase().split('').slice(0, 2)
    const params = useParams()
    var isAdmin = 'false'
    const postId = params.id
    if(currentUser){
        if(currentUser.admin){
            isAdmin=true
        }
    }


    const removeComment = async () => {
        try {
            //console.log('commentId',cmt._id)
           // console.log('postId',postId)
            const { data } = await axios.delete(`/comments/`, { data: {
                commentId: cmt._id,
                postId: postId
            }  
            })
            //('https://httpbin.org/delete', { data: { answer: 42 } })
            //console.log('data',data.message)
            // dispatch(removePost(params.id))
            toast('Комментарий был удален')
            // navigate('/')
            window.location.reload(false);
        } catch (error) {
            console.log(error)
        }
        
    }
    
    //console.log('cmt.comment',cmt.comment, 'cmt.id', cmt._id)
    //console.log('cmt.author',cmt.author.firstname)
    return (
        <div className='flex items-center gap-3 pt-2'>
            <div className='flex items-center flex-col'>
            {/* <div className='flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-blue-400 text-sm'>
                {avatar} 
                
            </div> */}
            <div className='flex text-white text-[12px]'>{cmt.authorName} :</div>

            </div>
            
            
            
            <div className='flex text-white text-[12px]'>{cmt.comment}</div>

            { (isAdmin===true) &&  (
                            <div className='flex gap-3'>
                                {/* <button className='flex items-center justify-center gap-2 text-black opacity-80'>
                                    <Link to={`/${params.id}/edit`}>
                                        <AiTwotoneEdit />
                                    </Link>
                                </button> */}
                                <button
                                    onClick={removeComment}
                                    className='flex items-center justify-center gap-2  text-black opacity-80'
                                >
                                    <AiFillDelete />
                                </button>
                            </div>
                        )}
        </div>
    )
}
