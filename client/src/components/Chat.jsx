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

export const Chat = ({ chat, curuser, chatUsers }) => {
    
    //const avatar = cmt.comment.trim().toUpperCase().split('').slice(0, 2)
    //console.log(chat)
    const chatId=chat._id
    const [allMessages, setAllMessages] = useState([{}])
    const [message, setMessage] = useState('')
    var first, second =''
    var firstId, secondId =''

    var filtered = chatUsers.filter(function (el) {
    return el != null;
    });
    console.log('chatUsers',filtered)
    console.log('chat',chat)
    // console.log('chat',chat)
    var chatOpponent = ''
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
    if(first)chatOpponent=first
    if(second)chatOpponent=second
    console.log('first',first)
    console.log('firstId',firstId)
    console.log('second',second)
    console.log('secondId',secondId)
    var check = false
    const timer = useRef(null);
    var messages =[{}]
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
    const fetchMessages = (async () => {
        const { data } = await axios.get(`/messages/${chat._id}`)

        setAllMessages(data)
       // console.log('data',data)
    })
    // useEffect(() => {
    //     fetchMessages()
    // }, [message])
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
    const handleSendMessage  = async () => {
        try {
            //fetchMessages()
            
            //console.log('chatId',chatId)
            const senderId = curuser._id
            const senderName = curuser.firstname
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
            
            
        } catch (error) {
            console.log(error)
        }
    }
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

    if(allMessages.length!=0){
        if(allMessages[0]._id){
            check=true
            //console.log('messages',allMessages)
            //console.log('legnth',allMessages.length)
    
        }
        // else{
        //     check=false
        // }
    }
    
    
    
    
    //console.log('message sender name',messages[0])
    console.log('check',check)
    if(check) 
    {
        return ( <div className='text-center text-blue-500 text-xl'> Чат с пользователем {chatOpponent}
            <div className='max-h-[200px] text-white overflow-auto p-2 bg-blue-700 flex flex-col gap-2 rounded-lg scroll-smooth'>
                {allMessages.length!==0?
                allMessages?.map((messages) => (
                <ChatItem key={messages._id} messages={messages} />
        
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

