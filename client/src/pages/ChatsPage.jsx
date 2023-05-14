import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PopularPosts } from '../components/PopularPosts'
import { CategoryItem } from '../components/CategoryItem.jsx'
import { TaskItem } from '../components/TaskItem'
import { checkIsAuth, getMe } from '../redux/features/auth/authSlice'
import { Chat } from '../components/Chat.jsx'
import { Conversation } from '../components/Conversation.jsx'
import "../Chat.css";
import {io} from 'socket.io-client'
import { getAllTasks } from '../redux/features/task/taskSlice'
import axios from '../utils/axios'
import {  useParams, useSearchParams } from 'react-router-dom'
import { ChatBox } from '../components/ChatBox'
import { async } from 'react-input-emoji'
//import { Button } from 'react-bootstrap';

export const ChatsPage = () => {

    const [chats, setChats] = useState([])
    const [chatUsers, setChatUsers] = useState([])
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams();
    const isAuth = useSelector(checkIsAuth)
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const { user } = useSelector((state) => state.auth)
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    const [respondTaskMessage, setRespondTaskMessage] = useState("");
    const [dataForRespond, setDataForRespond] = useState({});
    const paramsId=searchParams.get("id")
    const taskId=searchParams.get("task")


    const socket = useRef()
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getMe())
    // }, [dispatch])


    //console.log('user',user);

    const getChats = async () =>{
        try {
            const { data } = await axios.get('/chat/getchats')    
          
        
        
        setChats(data.filteredChats)
        setChatUsers(data.filteredUsers)

        
     
            
        } catch (error) {
            console.log(error)
        }
    }
   
    const handleRespondTask = async() =>{
      if(paramsId){
        
        var tmp;
        chats.forEach(element => {
          if((user?._id === element.firstUserId && paramsId ===element.secondUserId) || (user?._id === element.secondUserId && paramsId ===element.firstUserId)){
            setCurrentChat(element)
            tmp=element;
          }
        });
        if(taskId){
          const { data } = await axios.get(`/tasks/${taskId}`)
          //console.log('data',data.task)
  
          chatUsers.forEach(element => {
            if(element._id===paramsId)
            {
              setRespondTaskMessage(`Здравствуйте, ${element.firstname}! Хочу откликнуться на ваш заказ "${data.task.title}" за ${data.task.price}Р`)
            }
  
          });
        }
        
      }
      
    }
    //console.log('dataForRespond',dataForRespond)

    useEffect(() => {
        getChats()
    }, [])
    useEffect(() => {
      handleRespondTask()
  }, [chats])
  

    // Connect to Socket.io
   useEffect(()=>{
        socket.current = io('http://localhost:8800');
        socket.current.emit("new-user-add",user?._id)
        socket.current.on("get-users", (users)=>{
            //console.log('users',users)
            
            setOnlineUsers(users);
            //console.log('onlineUsers',onlineUsers)
        })
    }, [user, isAuth])

    useEffect(() => {
      if (sendMessage!==null) {
        socket.current.emit("send-message", sendMessage);}
    }, [sendMessage]);

    useEffect(() => {
      socket.current.on("recieve-message", (data) => {
        console.log('data',data)
        setReceivedMessage(data);
        console.log('receiveMessage',receivedMessage)
      });
    },[]);
    
    
    //  console.log('receiveMessage',receivedMessage)
    //  console.log('sendMessage',sendMessage)
     console.log('chats',chats)
    //  console.log('chats.length',chats.length)
    return (
        <div className="Chat mx-auto py-10">
          {/* Left Side */}
          <div className="Left-side-chat">
            
            <div className="Chat-container overflow-hidden">
              <h2 className='text-2xl font-bold text-color text-center'>Ваши чаты</h2>
              <div className="Chat-list break-all">
              { !(chats.length==0) ? (
                chats.map((chat, idx) => (
                  <div
                    onClick={() => {
                      setCurrentChat(chat);
                    }}
                  >
                    <Conversation
                      chat={chat}
                      currentUser={user?._id}
                      chatUsers={chatUsers}
                      key={idx}
                      // online={checkOnlineStatus(chat)}
                    />
                  </div>
                ))): (
                  <span className="chatbox-empty-message">
                    У вас пока нет чатов
                  </span>
                )}
  
              </div>
            </div>
          </div>
    
          {/* Right Side */}
    
          <div className="Right-side-chat">
            <div style={{ width: "20rem", alignSelf: "flex-end" }}>
              {/* <NavIcons /> */}
            </div>
            {user && currentChat && chatUsers && (
                  <ChatBox respondTaskMessage={respondTaskMessage} 
                  chat={currentChat} currentUser={user} setSendMessage={setSendMessage}
                  receivedMessage={receivedMessage} chatUsers={chatUsers} 
                  // dataForRespond={dataForRespond} 
                  
                  />
               )}
           
            {/* <ChatBox
              chat={currentChat}
              currentUser={user._id}
              setSendMessage={setSendMessage}
              receivedMessage={receivedMessage}
            /> */}
           
          </div>
        </div>
      );
}
