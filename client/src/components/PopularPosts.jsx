import React from 'react'
import { Link } from 'react-router-dom'

export const PopularPosts = ({ post }) => {
    return (
        <div className='bg-pink-200 my-1 text-center'>
            <Link
                to={`/service/${post._id}`}
                className=' text-black-400 text-center text-xs p-2 font-bold hover:text-white'
            >
                {post.text}
            </Link>
        </div>
    )
}
