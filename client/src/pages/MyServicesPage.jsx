import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { PostItem } from '../components/PostItem'
import axios from '../utils/axios'

export const MyServicesPage = () => {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState([])
    //const [isEmpty, setEmpty] = useState(false)
    
   // const { posts, popularPosts } = useSelector((state) => state.post)
    const fetchMyPosts = async () => {
        try {
            const { data } = await axios.get('/posts/user/me')
            setPosts(data.list)
            setUser(data.user)
            

            //console.log(data.list)
            //console.log(data.user)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMyPosts()
        
    }, [])


    // if(posts.length!=0){
    //     setEmpty(true)
    // } 
    // else {setEmpty(false)}
    console.log('posts',posts)
    console.log(user)
    return (
        
        <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
            <div className='text-xl text-center text-white'>
           Мои услуги
        </div>
             {posts.length!==0? 
             posts?.map((post, idx) => (
                <PostItem post={post} key={idx} user={user}/>
            ))
            : <div className='text-xl text-center text-white py-10'>
            У вас нет услуг
        </div>
            } 
        </div>
    )
}
