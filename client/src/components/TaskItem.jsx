import React from 'react'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState,useCallback } from 'react'
import axios from '../utils/axios'

export const TaskItem = ({ task, user }) => {

    const [isShown, setIsShown] = useState(false);
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
            <div className='flex justify-around gap-4 border-2 border-pink-200 rounded-lg p-2'>
                <div className='flex leftcard flex-col gap-2'>
                    <div className='text-2xl text-blue-600 font-bold opacity-100'>{task.title}</div>
                    <div className='text-m text-blue-600  opacity-100'>
                       {task.address}
                    </div>
                    <div className='text-m text-blue-600  opacity-100'>
                       {task.category}
                    </div>
                    <div>до {task.date}</div>
                    <div className='flex-none'>
                
                        <button className='flex items-center justify-center gap-2 text-xs text-black opacity-50'>
                            <AiFillEye /> <span>{task.views}</span>
                        </button>
                        
                    </div>


                </div>
                
            <div className='rightcard flex flex-col gap-2 justify-center'>

                <div className='text-2xl text-blue-600 font-bold opacity-100'>{task.price} ₽</div>
                <div className='text-black font-bold text-m'>{user.length>1?firstname:user.firstname} {user.length>1?secondname:user.secondname}</div>
                
        <button className='text-m font-bold rounded-lg bg-pink-100 p-1'
        onMouseEnter={() => setIsShown(true)}>
        Телефон
      </button>
      {isShown && (
        <div className='text-m font-bold'>
          {user.length>1?phonenumber:user.phonenumber}
        </div>
      )}
        
                {/* <div className='flex justify-between items-center '>
                <div className='text-blue-500 opacity-90 text-xl  line-clamp-4'>{task.text}</div>
                <div className='text-blue-500 opacity-90 text-xl  line-clamp-4'>{task.price} ₽</div>
                     
                </div> */}
                </div>
            </div>
        </Link>
    )
}
