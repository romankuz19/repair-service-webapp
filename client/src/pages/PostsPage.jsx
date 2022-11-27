import React from 'react'
import { useEffect } from 'react'
import { useState, useCallback } from 'react'
import { PostItem } from '../components/PostItem'
import axios from '../utils/axios'

export const PostsPage = () => {
    const [posts, setPosts] = useState([])
   // const { posts, popularPosts } = useSelector((state) => state.post)
    const fetchMyPosts = async () => {
        try {
            const { data } = await axios.get('/posts/user/me')
            setPosts(data.list)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMyPosts()
        
    }, [])


    return (
        
        <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
             { posts?
             posts.map((post, idx) => (
                <PostItem post={post} key={idx} />
            ))
            : <div className='text-center'>У вас нет постов</div>
            } 
        </div>
    )
}
