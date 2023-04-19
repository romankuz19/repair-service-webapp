import React from 'react'
import { Link } from 'react-router-dom'

export const PopularPosts = ({ post }) => {
    return (
        <div className='btn-color my-1 text-center'>
            <Link
                to={`/service/${post._id}`}
                className=' text-white text-center text-xs  p-2 font-bold hover:text-gray-400'
            >
                {post.text}
            </Link>
        </div>
    )
}
