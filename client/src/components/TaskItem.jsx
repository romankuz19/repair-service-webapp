import React from 'react'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'
import { Link, useNavigate } from 'react-router-dom'
import {  HiPhone } from 'react-icons/hi'

import { BsFillChatDotsFill} from 'react-icons/bs'
import { useEffect } from 'react'
import { useState,useCallback } from 'react'
import axios from '../utils/axios'

export const TaskItem = ({ task, user }) => {

    const [isShown, setIsShown] = useState(false);
    const [phone, setPhone] = useState('Телефон')
    const navigate = useNavigate()
    //console.log('firstname:',firstname)
    console.log('users',user)
    console.log('task',task)
    //console.log('user length',user.username)
    if(user.length>1){
        var arrObj = user;
        //console.log('users:',users)
           var arrstring = JSON.stringify(arrObj)
            const myArr = JSON.parse(arrstring);
            var firstname=''
            
            var secondname=''
            var city=''
            var phonenumber=''
            
           //console.log(task.author)
            for (var i = 0; i < myArr.length; i++) {
               
               var object = myArr[i];
               
   
               if(object._id===task.author){
                   firstname=object.firstname
                   secondname=object.secondname
                  
                   city=object.city
                   phonenumber=object.phonenumber
                   //console.log('obj username:',object.username)
                    //console.log('task username:',task.username)
                   //console.log('price:',price)
                   
               }
              
           }
    }
    
    
        
        
    if (!task || !user) {
        console.log('task',task)
        console.log('user',user)
        return (
            <div className='text-xl text-center text-black py-10'>
                Загрузка...
            </div>
        )
    }
    return (
        <Link to={`/task/${task._id}`}>
            {/* <div className='flex justify-around border-2 shadow-lg rounded-lg p-2'>
                <div className='flex min-w-[250px] leftcard flex-col gap-2'>
                    <div className='text-2xl text-blue-600 font-bold opacity-100'>{task.title}</div>
                    <div className='text-m text-blue-600  opacity-100'>
                       {task.address}
                    </div>
                    <div className='text-m text-blue-600  opacity-100'>
                       {task.category}
                    </div>
                    <div>до {task.date}</div>

                </div>
                
            <div className='rightcard min-w-[120px] justify-center flex flex-col gap-2 justify-left'>

                <div className='text-2xl text-blue-600 font-bold opacity-100 '>{task.price} ₽</div>
                <div className='text-black font-bold text-m py-3'>{user.length>1?firstname:user.firstname} {user.length>1?secondname:user.secondname}</div>
                
                <div className='flex gap-5 text-black text-m '>
                <div className='flex flex-wrap justify-center content-center text-m font-bold min-w-[150px] rounded-lg btn-color p-1 text-white hover:bg-blue-800 shadow-lg shadow-blue-500/50'
        onMouseEnter={() => setPhone(user.length>1?phonenumber:user.phonenumber)}>
           <HiPhone className='my-1 mr-1'/>
        {phone}
      </div>
      
      <div className='flex text-m font-bold rounded-lg btn-color p-1 text-white hover:bg-blue-800 shadow-lg shadow-blue-500/50'
      onClick={() => navigate('/chats') }
        >
            <BsFillChatDotsFill className='my-1 mr-1' />
        Чат
      </div>
      
                </div> */}
      
      {/* <div className='flex-none'>
                
                <button className='flex items-center justify-center gap-2 text-xs text-black opacity-50'>
                    <AiFillEye /> <span>{task.views}</span>
                </button>
                
            </div> */}
        
                {/* <div className='flex justify-between items-center '>
                <div className='text-blue-500 opacity-90 text-xl  line-clamp-4'>{task.text}</div>
                <div className='text-blue-500 opacity-90 text-xl  line-clamp-4'>{task.price} ₽</div>
                     
                </div> */}
                {/* </div>
            </div> */}

            <div className='flex flex-grow border-2 shadow-lg rounded-lg p-4'>
                
                
                <div className='rightcard flex-1 gap-2 w-64 pl-4'>
                <div className='flex justify-between items-center '>
                    <div className='text-2xl text-color font-bold opacity-100'>
                    {/* {user.length>1?firstname:user.firstname} {user.length>1?secondname:user.secondname} */}
                    {task.title}
                    </div>
                    <div className='text-small-color opacity-90 text-2xl  line-clamp-4'>{task.price} ₽</div>
                </div>
                <div className='flex justify-between items-center '>
                <div className='text-small-color opacity-90 text-2xl  line-clamp-4 pt-1'>до {task.date}</div>
                {/* <hr style={{ width: "20%", border: "0.1px solid #ececec" }} /> */}
                
                     
                </div>
               
               
                
                <div className='text-cat-color text-m py-2'>{task.address}</div>

                <div className='text-cat-color text-m '>{user.length>1?firstname:user.firstname} {user.length>1?secondname:user.secondname}</div>
                
                <div className='flex justify-between'>

                    <div>
                    <div className='flex gap-10 text-black text-m pt-2'>
                <div className='flex flex-wrap justify-center content-center text-m font-bold min-w-[150px] rounded-lg btn-color p-1 text-white hover:bg-blue-800 shadow-lg shadow-blue-500/50'
        onMouseEnter={() => setPhone(user.length>1?phonenumber:user.phonenumber)}>
           <HiPhone className='my-1 mr-1'/>
        {phone}
      </div>
      
      <div className='flex text-m font-bold rounded-lg btn-color p-1 text-white hover:bg-blue-800 shadow-lg shadow-blue-500/50'
      onClick={() => navigate('/chats') }
        >
            <BsFillChatDotsFill className='my-1 mr-1' />
        Чат
      </div>
      
                </div>
                    </div>

                    <div className='align-text-bottom'>
                    <div className='text-xs text-black opacity-80 pt-6'>
                        Категория: {task.category}
                    </div>
                    </div>

                </div>
                
                
                
                
                
                </div>
            </div>
        </Link>
    )
}
