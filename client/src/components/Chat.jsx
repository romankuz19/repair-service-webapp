import React from 'react'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useState,useCallback } from 'react'

import axios from '../utils/axios'
import { MessageItem } from '../components/MessageItem.jsx'
import { ChatItem } from './СhatItem'
import {io} from 'socket.io-client'
import { current } from '@reduxjs/toolkit'

import { createChat, getChatMessages, createMessage } from '../redux/features/chat/chatSlice'


export const Chat = ({ chat, curuser, chatUsers }) => {
    
    //const avatar = cmt.comment.trim().toUpperCase().split('').slice(0, 2)
    //console.log('chatUsers',chatUsers)
    const chatId=chat._id
    const [allMessages, setAllMessages] = useState([{}])
    const [message, setMessage] = useState('')
    const socket = useRef()
    const [onlineUsers, setOnlineUsers] = useState([{}])
    const [sendMessage, setSendMessage] = useState(null)
    const [receiveMessage, setReceiveMessage] = useState(null)
    const dispatch = useDispatch()
    const { messages } = useSelector((state) => state.chat)
    const scroll = useRef()

    //console.log('messages',messages)
    // console.log('chatUsers',chatUsers)

    useEffect(()=>{
        socket.current = io('http://localhost:8800');
        socket.current.emit("new-user-add",curuser._id)
        socket.current.on('get-users', (users)=>{
            //console.log('users',users)
            
            setOnlineUsers(users);
            //console.log('onlineUsers',onlineUsers)
        })

    }, [curuser])

    useEffect(()=>{
       if(sendMessage!==null){
        socket.current.emit('send-message', sendMessage)
       }

    }, )

    useEffect(()=>{
        console.log('receiveMessage',receiveMessage)
            socket.current.on('receive-message', (message)=>{
                console.log('dadadsadsd')
                setReceiveMessage(message)
            })
     }, )
    

    var first, second =''
    var firstId, secondId =''



    var filtered = chatUsers.filter(function (el) {
    return el != null;
    });
    // console.log('chatUsers',filtered)
    // console.log('chat',chat)
    // console.log('chat',chat)
    var chatOpponent = ''
    var chatOpponentId= ''
    for(var i =0;i<filtered.length;i++){
        if(filtered[i]._id===chat.firstUserId){
            first=filtered[i].firstname
            firstId=filtered[i]._id
            if(filtered[i]._id===chat.secondUserId){
                second=filtered[i].firstname
                secondId=filtered[i]._id
                break
            }
        }
        if(filtered[i]._id===chat.secondUserId){
            second=filtered[i].firstname
            secondId=filtered[i]._id
            if(filtered[i]._id===chat.firstUserId){
                first=filtered[i].firstname
                firstId=filtered[i]._id
                break
            }
        }
       
    }

    // if(curuser._id===firstId){
    //     chatOpponent=second
    // }
    // else if(curuser._id===secondId){
    //     chatOpponent=first
    // }
    if(first){
        chatOpponent=first
        chatOpponentId = firstId
    }
    if(second){
        chatOpponent=second
        chatOpponentId = secondId
    }
    // console.log('first',first)
    // console.log('firstId',firstId)
    // console.log('second',second)
    // console.log('secondId',secondId)
    var check = false
    const timer = useRef(null);
    //var messages =[{}]
    // const getMessages = async () => {
    //     try {
        
    //         const { data } = await axios.get(`/messages/${chat._id}`)
    //        // console.log('data',data)
          
    //         // var filtered = userChats.filter(function (el) {
    //         //     return el != null;
    //         //   });
            
    //         //for (var i = 0; i < data.length; i++){
    //             //setAllMessages(data)   
    //         messages=data      
    //         console.log('data',data)
    //         //console.log('messages',messages)
            
    //         return messages
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    const handleSendMessage  = async () => {
        try {
            
            
            //console.log('chatId',chatId)
            const senderId = curuser._id
            //const receiverId= 
            console.log('firstId', firstId)
            console.log('secondId', secondId)
            const senderName = curuser.firstname
            setSendMessage(message);
            var receiverId = chatOpponentId
            setSendMessage({message, receiverId})
            //console.log('senderId',senderId)
            //console.log('senderName',senderName)
            //console.log('message',message)
                try {
                    const { data } = await axios.post(`/messages/`, {
                        chatId,
                        senderId,
                        senderName,
                        message
                    })
                    setMessage('')
                    return data
                } catch (error) {
                    console.log(error)
                }

                //send message to socket server
               // console.log('sendmessage',sendMessage)
               fetchMessages()
            
            
        } catch (error) {
            console.log(error)
        }
    }
    //console.log('sendmessage',sendMessage)

    const fetchMessages = useCallback(async () => {
        const { data } = await axios.get(`/messages/${chat._id}`)

        setAllMessages(data.messages)
        //console.log('data',data)
    })

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

    // useEffect(() => {
    //     getMessages()
    // }, [getMessages])

    useEffect(() => {
        fetchMessages()
    }, [])

    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            // Your useEffect code here to be run on update
            setAllMessages(messages)
            fetchMessages()
        }
        },[messages]);
        
    // useEffect(() => {
    //     if(btn){
    //         //console.log('btn',btn)
    //         //console.log('isload',isLoaded)
    //         if(!isLoaded && chat){
    //             setIsloaded('true')
    //             setAllMessages(messages)
    //             //fetchMessages()
    //         }
            
    //     }
        
    //   });


    



    // useEffect(() => {
    //     const interval = setInterval(fetchMessages, 10000);
    //     return () => clearInterval(interval);
    //   }, []);

    

    useEffect(() => {
        {
            const interval = setInterval(fetchMessages, 1000);
            return () => clearInterval(interval);
        }
      });
    
    //getMessages()
    
    //console.log('all messages chat',allMessages)
    
    // var name1 , name2=''
    // // console.log('chat firstUserIdid',chat.firstUserId)
    // // console.log('chat secondUserId',chat.secondUserId)
    // // console.log('curuser',curuser._id)
    // if(curuser._id===chat.firstUserId || curuser._id===chat.secondUserId){
    //     name1=curuser.firstname
    // }
    // for (var i = 0; i < chatUsers.length; i++) {
    //     //console.log('users',chatUsers[i]._id)
    //     if((chatUsers[i]._id===chat.secondUserId && name1===chat.firstUserId) || (chatUsers[i]._id===chat.firstUserId && name1===chat.secondUserId)){
    //         name2=chatUsers[i].firstname
        
    //     }

    // }
    //console.log('messages',messages)
   // console.log('allMessages',allMessages)

    if(allMessages?.length!=0){
        if(allMessages[0]?._id){
            check=true
            //console.log('messages',allMessages)
            //console.log('legnth',allMessages.length)
    
        }
        // else{
        //     check=false
        // }
    }
    
    // useEffect (()=>{
    //     scroll.current?.scrollIntoView({behavior:"smooth"})
    // }, [allMessages, messages, message])
    
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }
    
      useEffect(() => {
        scrollToBottom()
      }, [allMessages]);
      
    //console.log('message sender name',messages[0])
    //console.log('chatOpponent',chatOpponent)
    if(check) 
    {
        return ( <div className='text-center text-blue-500 text-xl'> Чат с пользователем {chatOpponent}
            <div ref={messagesEndRef}
             className='max-h-[200px] text-white overflow-auto p-2 bg-blue-700 flex flex-col gap-2 rounded-lg scroll-smooth'>
                {allMessages.length!==0?
                allMessages?.map((messages) => (
                <ChatItem  key={messages._id} messages={messages} />
        
    )):
    <div className='items-center'>Пока нет чатов</div>
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
            </div>)
        
                 
                           
    }
    else {

        return(<div className='items-center'>Пока нет чатов</div>)
    }
            
        // </div>
        
        
        
        
        //<MessageItem key={allMessages[0]._id} msg={allMessages[0].message} senderName={allMessages[0].senderName}></MessageItem>
        
    
                }

