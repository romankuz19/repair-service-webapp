import React from 'react'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

export const PostItem = ({ post }) => {
    if (!post) {
        return (
            <div className='text-xl text-center text-black py-10'>
                Загрузка...
            </div>
        )
    }
    return (
        <Link to={`/${post._id}`}>
            <div className='flex flex-grow'>
                <div className='leftcard flex-none'>
                <div
                    className={
                        post.imgUrl ? 'flex rouded-sm' : 'flex rounded-sm'
                    }
                >
                    {post.imgUrl && (
                        <img
                            src={`http://localhost:3002/${post.imgUrl}`}
                            alt='img'
                            className='object-cover h-40 w-40 rounded-lg'
                        />
                    )}
                </div>
                <div className='flex justify-around py-1 items-center '>
                    <button className='flex items-center justify-center gap-2 text-xs text-black opacity-50'>
                        <AiFillEye /> <span>{post.views}</span>
                    </button>
                    <button className='flex items-center justify-center gap-2 text-xs text-black opacity-50'>
                        <AiOutlineMessage />{' '}
                        <span>{post.comments?.length || 0} </span>
                    </button>
                </div>
                </div>
                
                <div className='rightcard flex-1 w-64 pl-2'>
                <div className='flex justify-around items-center '>
                    <div className='text-2xl text-black opacity-100'>
                        {post.username}
                    </div>
                    <div className='text-xs text-black opacity-50'>
                        <Moment date={post.createdAt} format='D MMM YYYY' />
                    </div>
                </div>
                <div className='text-black text-xl'>{post.title}</div>
                <p className='text-black opacity-60 text-xs pt-4 line-clamp-4'>
                    {post.text}
                </p>
                </div>
                

                
            </div>
        </Link>
    )
}
