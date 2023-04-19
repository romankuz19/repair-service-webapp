import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { TaskItem } from '../components/TaskItem'

import axios from '../utils/axios'

export const MyTasksPage = () => {
    const [tasks, setPosts] = useState([])
    const [user, setUser] = useState([])
    //const [isEmpty, setEmpty] = useState(false)
    
   // const { services, popularPosts } = useSelector((state) => state.service)
    const fetchMyPosts = async () => {
        try {
            const { data } = await axios.get('/tasks/user/me')
            //console.log('data',data)
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


    // if(services.length!=0){
    //     setEmpty(true)
    // } 
    // else {setEmpty(false)}
    //console.log('services',services)
    //console.log(user)
    return (
        <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
            <div className='text-xl text-center text-white'>
           Мои заказы
        </div>
             {tasks?.length!==0? 
             tasks?.map((task, idx) => (
                <TaskItem task={task} key={idx} user={user}/>
            ))
            : <div className='text-xl text-center text-white py-10'>
            У вас нет заказов
        </div>
            } 
        </div>
    )
}
