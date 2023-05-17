import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ServiceItem } from '../components/ServiceItem'
import axios from '../utils/axios'
import { toast } from 'react-toastify'

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
            toast.info("Проблемы с соединением :(")
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
    // console.log('posts',posts)
    // console.log('user',user)
    // console.log('posts.length',posts.length)
    return (
        
        <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
            <div className='text-xl text-center text-black'>
           Мои услуги
        </div>
             {(posts.length!==0)?( 
             posts?.map((service, idx) => (
                <ServiceItem service={service} key={idx} user={user}/>
            )))
            :(
            <div className='text-xl text-center text-black py-10'>
            У вас нет услуг
        </div>
            )
            } 
        </div>
    )
}
