import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    AiFillEye,
    AiOutlineMessage,
    AiTwotoneEdit,
    AiFillDelete,
} from 'react-icons/ai'
import Moment from 'react-moment'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import axios from '../utils/axios'
import { removePost } from '../redux/features/post/postSlice'
import {
    createComment,
    getPostComments,
} from '../redux/features/comment/commentSlice'
import { CommentItem } from '../components/CommentItem'

export const PostPage = () => {
    const [post, setPost] = useState(null)
    const [user, setUser] = useState(null)
    const [comment, setComment] = useState('')
    const [currentUser, setCurrentOwner] = useState(null)
    
    const { comments } = useSelector((state) => state.comment)
    
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    

    const fetchUser = async () => {
        const { data } = await axios.get('/auth/me')
       
       // console.log(data.user)
       setCurrentOwner(data.user)
        
       
       
    }
    //console.log(currentUser)
    
    const removePostHandler = () => {
        try {
            dispatch(removePost(params.id))
            toast('Услуга была удалена')
            navigate('/')
            window.location.reload(false);
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = () => {
        try {
            const postId = params.id
            dispatch(createComment({ postId, comment }))
            setComment('')
        } catch (error) {
            console.log(error)
        }
    }

    const fetchComments = useCallback(async () => {
        try {
            dispatch(getPostComments(params.id))
        } catch (error) {
            console.log(error)
        }
    }, [params.id, dispatch])

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        setPost(data.post)
        setUser(data.user)
        //console.log(data)
    }, [params.id])

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    useEffect(() => {
        fetchComments()
    }, [fetchComments])

    useEffect(() => {
        fetchUser()
    },[])

    if (!post) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Загрузка...
            </div>
        )
    }
    //console.log('user',user[0])
    //console.log(comments)
    return (
        <div className='max-w-[1200px] mx-auto py-10'>
            <button className='bg-blue-600 text-xs text-white rounded-lg py-2 px-4 hover:text-black'>
                <Link className='flex' to={'/'}>
                    Назад
                </Link>
            </button>

            <div className='flex justify-between mx-auto py-8'>
                <div className='py-5 min-w-[500px] '>
                    <div className='flex flex-col basis-1/4 flex-grow'>
                        <div
                            className='object-cover h-40 w-40 rounded-lg'
                            
                        >
                            {post?.imgUrl && (
                                <img
                                    src={`http://localhost:3002/${post.imgUrl}`}
                                    alt='img'
                                    className='object-cover h-40 w-40 rounded-lg'
                                />
                            )}
                        </div>
                    </div>

                    
                <div className='flex justify-between items-center '>
                    <div className='text-2xl text-blue-600 font-bold opacity-100'>
                        {user[0].firstname} {user[0].secondname} 
                        
                    </div>
                    <div className='text-m text-blue-600 font-bold opacity-100'>
                       Телефон: {user[0].phonenumber}
                    </div>
                    
                    <div className='text-xs text-black opacity-80'>
                        <Moment date={post.createdAt} format='D MMM YYYY' />
                    </div>
                </div>
                
                <div className='text-black text-m'>{user[0].city}</div>
                <div className='text-black text-m'>{post.title}</div>
                
                <div className='flex justify-between items-center '>
                <div className='text-blue-500 opacity-90 text-xl  line-clamp-4'>{post.text}</div>

                <div className='text-blue-500 opacity-90 text-xl  line-clamp-4'>{post.price} ₽</div>
                     
                </div>
                

                    <div className='flex gap-3 items-center mt-2 justify-between'>
                        <div className='flex gap-3'>
                            <button className='flex items-center justify-center gap-2 text-xs text-black opacity-80'>
                                <AiFillEye /> <span>{post.views}</span>
                            </button>
                            <button className='flex items-center justify-center gap-2 text-xs text-black opacity-80'>
                                <AiOutlineMessage />{' '}
                                <span>{post.comments?.length || 0} </span>
                            </button>
                        </div>

                        {currentUser?._id === post.author && (
                            <div className='flex gap-3'>
                                <button className='flex items-center justify-center gap-2 text-black opacity-80'>
                                    <Link to={`/${params.id}/edit`}>
                                        <AiTwotoneEdit />
                                    </Link>
                                </button>
                                <button
                                    onClick={removePostHandler}
                                    className='flex items-center justify-center gap-2  text-black opacity-80'
                                >
                                    <AiFillDelete />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className='w-1/3 max-h-[400px] overflow-auto p-8 bg-blue-700 flex flex-col gap-2 rounded-lg'>
                    <form
                        className='flex gap-2'
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type='text'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder='Оставьте отзыв'
                            className='text-black w-full rounded-lg bg-blue-400 border p-2 text-xs outline-none placeholder:text-white'
                        />
                        <button
                            type='submit'
                            onClick={handleSubmit}
                            className='flex justify-center items-center bg-blue-400 text-xs text-white rounded-lg py-2 px-4 hover:text-black'
                        >
                            Отправить
                        </button>
                    </form>
                    

                    {comments?.map((cmt) => (
                        <CommentItem key={cmt._id} cmt={cmt} />
                    ))}
                </div>
            </div>
        </div>
    )
}
