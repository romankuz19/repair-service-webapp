import React from 'react'
import { useEffect, useRef } from 'react'
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
import { removeTask, removetask } from '../redux/features/task/taskSlice'
//import {createChat} from '../redux/features/chat/chatSlice.js'
import { CommentItem } from '../components/CommentItem'
import { MessageItem } from '../components/MessageItem.jsx'
import { checkIsAuth, logout } from '../redux/features/auth/authSlice'
import { createChat, getChatMessages, createMessage } from '../redux/features/chat/chatSlice'
import { Chat } from '../components/Chat.jsx'


export const TaskPage = () => {
    const isAuth = useSelector(checkIsAuth)
    const [task, setTask] = useState(null)
    const [ownerTaskUser, setownerTaskUser] = useState(null)
    const [chat, setChat] = useState(null)

    const [comment, setComment] = useState('')
    const [message, setMessage] = useState('')
    const [allMessages, setAllMessages] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [cmtUser, setCmtuser] = useState([])
    
    //const [ownerTaskUser, setownerTaskUser] = useState(null)
    const [btn, setBtn] = useState(false)
    const [isLoaded, setIsloaded] = useState(false)
    const [chatUsers, setChatUsers] = useState([])
    // console.log('curUser',currentUser);
    // console.log('owmerUser',ownerTaskUser);
   

    
    const { messages } = useSelector((state) => state.chat)
    //console.log('messagesYES',messages);
    
    const navigate = useNavigate()
    const params = useParams()
    //console.log('params',params)
    const dispatch = useDispatch()
    //var btn = false

    

    const [isShown, setIsShown] = useState(false);
    const fetchtask = useCallback(async () => {
        const { data } = await axios.get(`/tasks/${params.id}`)
        setTask(data.task)
        setownerTaskUser(data.user)
        //console.log('user',data.user)
        //console.log(data)
    }, [params.id])

    useEffect(() => {
        fetchtask()
    }, [fetchtask])


    useEffect(() => {
        fetchUser()
    },[])

    const fetchUser = async () => {
        const { data } = await axios.get('/auth/me')
       
       //console.log(data.user)
       setCurrentUser(data.user)
       setCmtuser(data.user)

       //setownerTaskUser(user)
    }
    //console.log('btn',btn)
    const handleCreateChat = async () =>{
    //console.log('currentUser._id',currentUser._id)
    //console.log('ownerTaskUser._id',ownerTaskUser._id)
    var firstUserId = currentUser._id;
    var secondUserId= ownerTaskUser._id;
    //const chatU = []
    chatUsers.push(ownerTaskUser);
    console.log('chatUsers',chatUsers)

    const { data } = await axios.post(`/chat/create`, {
        firstUserId,
        secondUserId,
    })
    //console.log('data',data);
    //dispatch(createChat({firstUserId, secondUserId}));
    setChat(data);
    setBtn('true');
    
    //console.log('chat',chat)

    }

    const getMessages = useCallback(async () => {
        try {
           // var chatId = chat._id
           //console.log('chatId',chatId)
           if(chat)
           {
            dispatch(getChatMessages(chat._id))
            setAllMessages(messages)
           }
            
        } catch (error) {
            console.log(error)
        }
    }, [chat?._id, dispatch])

    useEffect(() => {
        getMessages()
    }, [getMessages])


    const removeTaskHandler = async () =>{
        try {
            console.log('params',params)
            dispatch(removeTask(params.id))
            toast('Задание было удалено')
            navigate('/tasks')
            //window.location.reload(false);
        } catch (error) {
            console.log(error)
        }
    }
    

    const fetchMessages = async () => {
        try {
            if(chat){
                const { data } = await axios.get(`/messages/${chat._id}`)
                //console.log(data)
                setAllMessages(data.messages)
            }
            dispatch(getChatMessages(chat._id))
            
        } catch (error) {
            console.log(error)
        }
    }

    //console.log('btn',btn)
    //console.log('isload',isLoaded)
    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            // Your useEffect code here to be run on update
            fetchMessages()
            
        }
        },[message]);
        
    useEffect(() => {
        if(btn){
            //console.log('btn',btn)
            //console.log('isload',isLoaded)
            if(!isLoaded && chat){
                setIsloaded(true)
                fetchMessages()
            }
            
        }
        
      });
    

    useEffect(() => {
        if(btn && isLoaded){
            const interval = setInterval(fetchMessages, 1000);
            return () => clearInterval(interval);
        }
      });


    
    //console.log('messages',messages)
   //console.log('a',chat)
    const handleSendMessage  = async () => {
        try {
            //fetchMessages()
            
            //console.log(chatId)
            const chatId=chat._id
            const senderId = currentUser._id
            const senderName = currentUser.firstname
           // console.log(currentUser.firstname)
                try {
                    const { data } = await axios.post(`/messages/`, {
                        chatId:chat._id,
                        senderId:currentUser._id,
                        senderName:currentUser.firstname,
                        message
                    })
                   // console.log('message',message);
                  // dispatch(createMessage({chatId, senderId, senderName, message}));
                    setMessage('')
                    //getMessages()
                    
                    return data
                } catch (error) {
                    console.log(error)
                }
            
            
        } catch (error) {
            console.log(error)
        }
    }

    

    
    //console.log('allmsg',allMessages)
    if (!task) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Загрузка...
            </div>
        )
    }
    //console.log('commentes',comments)
    //console.log('allmsg',allMessages)
    // console.log('curuser',currentUser._id)
    // console.log('ownuser',ownerTaskUser._id)
    //console.log('chat',chat[0]._id)
    //console.log(currentUser._id)
    //console.log('task author',task.author)
    //console.log(allMessages)

    return (
        <div className='max-w-[1200px] mx-auto py-10'>
            <button className='bg-blue-600 text-xs text-white rounded-lg py-2 px-4 hover:text-black'>
                <Link className='flex' to={'/tasks'}>
                    Назад
                </Link>
            </button>
            <div className='mx-auto max-w-[900px] py-8'>
            <div className='flex justify-around gap-4 border-2 border-pink-200 rounded-lg p-2'>
                <div className='flex leftcard flex-col gap-2'>
                    <div className='text-2xl text-blue-600 font-bold opacity-100'>Задача </div>
                    <div className='text-m text-blue-600  opacity-100'>
                       Адрес 
                    </div>
                    <div className='text-m font-bold'>
                      Заказчик 
                    </div>

                    <div className='text-m text-blue-600  opacity-100'>
                    Категория 
                    </div>
                    
                    


                </div>
                
            <div className='midcard flex flex-col gap-2 justify-center'>

                <div className='text-2xl text-blue-600 font-bold opacity-100'>{task.title}</div>
                <div className='text-m text-blue-600  opacity-100'>{task.address}</div>
                <div className='text-m font-bold'>{ownerTaskUser.firstname} {ownerTaskUser.secondname}</div>
                <div className='text-m text-blue-600  opacity-100'>
                    {task.category}
                    </div>
                </div>

                <div className='rightcard flex flex-col gap-2 justify-center'>
                <div className='text-2xl text-blue-600 font-bold opacity-100'>Оплата: {task.price} ₽</div>
                <button className='text-m font-bold rounded-lg bg-pink-100 p-1'
                    onMouseEnter={() => setIsShown(true)}>
                    Телефон
                </button>
                {isShown && (
                    <div className='text-m font-bold text-center'>
                    {ownerTaskUser.phonenumber}
                    </div>
                        )}
                
                
                {isAuth && (
                     currentUser._id !== ownerTaskUser._id && (
                    <button onClick={handleCreateChat} className='bg-blue-400 text-xs text-white rounded-lg py-1 px-1 hover:text-black'>Напишите заказчику</button>)
               
               )}
                {/* <button onClick={handleCreateChat} className='bg-blue-400 text-xs text-white rounded-lg py-1 px-1 hover:text-black'>Напишите исполнителю</button>
                 */}
                 {!isAuth && (
                 <a href='/login' className='bg-blue-400 text-xs text-white rounded-lg py-1 px-1 hover:text-black'>Напишите заказчику</a>
               )}
                    <div className='flex flex-row justify-between'>
                        <button className='flex items-center justify-center gap-2 text-xs text-black opacity-50'>
                            <AiFillEye /> <span>{task.views}</span>
                        </button>
                        {((currentUser?._id === ownerTaskUser._id) || (currentUser?.admin===true)) &&  (
                            <div className='flex flex-row gap-3 justify-end'>
                                <div className='flex'>
                                <button className='flex items-center justify-center gap-2 text-black opacity-80'>
                                    <Link to={`/task/${params.id}/edit`}>
                                        <AiTwotoneEdit />
                                    </Link>
                                </button>
                                </div>
                                <div className='flex'>
                                <button
                                    onClick={removeTaskHandler}
                                    className='flex items-center justify-center gap-2  text-black opacity-80'
                                >
                                    <AiFillDelete />
                                </button>
                                </div>
                                
                            </div>
                        )}
                        
                    </div>

                    
        

                </div>
                
            </div>

            

            <div className='flex justify-center py-5'>
            {chat && (
                            <div className='w-1/3 ml-5'>
                            <div className='max-h-[400px] text-white overflow-auto p-2 bg-blue-700 flex flex-col gap-2 rounded-lg'>
                                {allMessages.length!==0?
                                allMessages?.map((msg) => (
                             <MessageItem key={msg._id} msg={msg} />
                        
                        
                    )):
                    <div>История сообщений пуста</div>
                    }
                            </div>
                            <form
                                    className='flex gap-2 p-2'
                                    onSubmit={(e) => e.preventDefault()}
                                >
                                    <input
                                        type='text'
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder='Отправьте сообщение'
                                        className='text-black w-full rounded-lg bg-blue-400 border p-2 text-xs outline-none placeholder:text-white'
                                    />
                                    <button
                                        type='submit'
                                        onClick={handleSendMessage}
                                        className='flex justify-center items-center bg-blue-400 text-xs text-white rounded-lg py-2 px-4 hover:text-black'
                                    >
                                        Отправить
                                    </button>
                                </form>
                            </div>
                        )}



                        {/* {chat && (<Chat chat={chat} curuser={currentUser} chatUsers={chatUsers} />)} */}
                        
            </div>
            
        </div>
        </div>
    )
}
