import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PopularPosts } from '../components/PopularPosts'
import { CategoryItem } from '../components/CategoryItem.jsx'
import { TaskItem } from '../components/TaskItem'
import { checkIsAuth, getMe } from '../redux/features/auth/authSlice'
import { Chat } from '../components/Chat.jsx'

import { getAllTasks } from '../redux/features/task/taskSlice'
import axios from '../utils/axios'
//import { Button } from 'react-bootstrap';

export const ChatsPage = () => {

    const [chats, setChats] = useState([])
    const [chatUsers, setChatUsers] = useState([])
    const isAuth = useSelector(checkIsAuth)
    const { user } = useSelector((state) => state.auth)
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getMe())
    // }, [dispatch])


    //console.log('user',user);

    const getChats = async () =>{
        try {
            const { data } = await axios.get('/chat/getchats')    
            // const { data } = await axios.get(`/chat/getchats`,{
                
            // //     {
            // //     firstUserId: currentUser._id,
            // //     secondUserId: user[0]._id,
            //  }
            // )
       // console.log('user',user[0]._id)
       // console.log('curuser',currentUser._id)
        
        //setChat(checkchat)        
        //return checkchat[0]
        //console.log('messages',data[0].messages)
        //console.log('dada',data)
        setChats(data.filteredChats)
        setChatUsers(data.filteredUsers)
       // console.log('dada',chats)
        //setTimeout(getMessages, 2000);
        //getMessages()
            
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getChats()
    }, [])

    console.log('chats',chats);
    console.log('chatUsers',chatUsers);
    
    return (
        
        <>
        
        <div className='max-w-[900px] mx-auto py-10'>
               

        <div className='grid grid-cols-2 grid-flow-row gap-4'>
              {isAuth && chats.length!==0 && ( 
                
                chats?.map((chat , idx) => (
                    
                <Chat chat={chat} curuser={user} chatUsers={chatUsers} key={idx} />
            )))
            
            }   
            </div>
        </div>
        </>
    )
}
