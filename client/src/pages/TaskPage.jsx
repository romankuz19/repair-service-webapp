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
import {  HiPhone } from 'react-icons/hi'
import { BsFillChatDotsFill} from 'react-icons/bs'
import Moment from 'react-moment'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
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
    const [phone, setPhone] = useState('Телефон')

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
    const [searchParams, setSearchParams] = useSearchParams();

    
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
    navigate('/chats')
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
            toast.info('Задание было удалено')
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



      const handleRespondTask = async () =>{
        try {
            var firstUserId = currentUser._id;
            var secondUserId= ownerTaskUser._id;
            const { data } = await axios.post(`/chat/create`, {
                firstUserId,
                secondUserId,
            })
        navigate(`/chats/?id=${ownerTaskUser._id}&task=${task._id}`)
            
        } catch (error) {
            console.log(error)
        }
    }


    
    
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
            {/* <button className='bg-blue-600 text-xs text-white rounded-lg py-2 px-4 hover:text-black'>
                <Link className='flex' to={'/tasks'}>
                    Назад
                </Link>
            </button> */}
            <div className='mx-auto max-w-[900px] py-8'>
            <div className='flex justify-around min-h-[170px] gap-4 border-2 border-2 shadow-lg rounded-lg p-2'>
               
                
                <div className='left-card flex flex-col gap-2 justify-center'>

                <div className='text-2xl text-color font-bold opacity-100'>{task.title}</div>
                <div className='text-m opacity-100'>{task.address}</div>
                
                <div className='text-m font-bold'>{ownerTaskUser.firstname} {ownerTaskUser.secondname}</div>
                

                <div className='text-m '>Описание: {task.description}</div>
                </div>

                <div className='right-card flex flex-col gap-2 justify-center'>
                <div className='text-2xl text-color font-bold opacity-100'>Оплата: {task.price} ₽</div>
                <div className='text-m  opacity-100'>до {task.date}</div>
                <div className='flex gap-5 text-black text-m '>
                        <div className='flex flex-wrap justify-center content-center text-m font-bold min-w-[150px] text-white rounded-lg btn-color p-1 hover:bg-blue-800'
                >
                   <HiPhone className='my-1 mr-1'/>
                {ownerTaskUser.phonenumber}
              </div>
              { 
                isAuth && (currentUser?._id !== ownerTaskUser._id) ? (<div className='flex text-m font-bold text-white rounded-lg btn-color p-1 cursor-pointer hover:bg-blue-800 '
                onClick={handleCreateChat}>
                <BsFillChatDotsFill className='my-1 mr-1' />
                  Чат
                </div>) 
                : !isAuth ? (<div className='flex text-m font-bold rounded-lg btn-color p-1 text-white cursor-pointer hover:bg-blue-800 '
                onClick={()=> {navigate('/login');toast.info('Сперва войдите в аккаунт')}}>
                <BsFillChatDotsFill className='my-1 mr-1' />
                  Чат
                </div>)
                : isAuth && (currentUser?._id === ownerTaskUser._id) ? (<div></div>):(<div></div>)}


                
              
              
                        
                {/* {isShown && (
                    <div className='text-m font-bold text-center'>
                    {ownerTaskUser.phonenumber}
                    </div>
                        )} */}
                
                
                {/* {isAuth && (
                     currentUser._id !== ownerTaskUser._id && (
                    <button onClick={handleCreateChat} className='bg-blue-400 text-xs text-white rounded-lg py-1 px-1 hover:text-black'>Напишите заказчику</button>)
               
               )} */}
                {/* <button onClick={handleCreateChat} className='bg-blue-400 text-xs text-white rounded-lg py-1 px-1 hover:text-black'>Напишите исполнителю</button>
                 */}
                 {/* {!isAuth && (
                 <a href='/login' className='bg-blue-400 text-xs text-white rounded-lg py-1 px-1 hover:text-black'>Напишите заказчику</a>
               )} */}
               </div>
               

               <div className='flex items-center'>
               { 
                isAuth && (currentUser._id !== ownerTaskUser._id) ? (<div className='flex text-m font-bold text-white rounded-lg btn-color-main p-1 cursor-pointer hover:bg-blue-800 '
                onClick={handleRespondTask}>
                  Откликнуться
                </div>) 
                : !isAuth ? (<div className='flex text-m font-bold rounded-lg btn-color-main p-1 text-white cursor-pointer hover:bg-blue-800 '
                onClick={()=> {navigate('/login');toast.info('Сперва войдите в аккаунт')}}>
                
                Откликнуться
                </div>)
                : isAuth && (currentUser._id === ownerTaskUser._id) ? (<div></div>):(<div></div>)}
               </div>

              


               {((currentUser?._id === ownerTaskUser._id) || (currentUser?.admin===true)) ?  (
                    <div className='flex flex-row justify-between'>
                        <button className='flex items-center justify-center gap-2 text-xs text-black opacity-50'>
                            <AiFillEye /> <span>{task.views}</span>
                        </button>
                        
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
                       
                        
                    </div>
                     ):
                     (<div className='flex justify-center'>
                     {/* <button className='flex items-center justify-center gap-2 text-xs text-black opacity-50'>
                         <AiFillEye /> <span>{task.views}</span>
                     </button> */}
                     
                     
                     </div>)
                     }

                    
        

                </div>
                 
                
            </div>

            
            
        </div>
        </div>
    )
}
