import React from 'react'
import { AiFillEye, AiOutlineMessage, AiFillWechat } from 'react-icons/ai'
import {  HiPhone } from 'react-icons/hi'

import { BsFillChatDotsFill} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'
import 'moment/locale/ru';
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState,useCallback } from 'react'
import axios from '../utils/axios'

export const ServiceItem = ({ service, user }) => {

    
    //console.log('firstname:',firstname)
    //console.log('users',user)
    //console.log('service',service)
    //console.log('user length',user.username)
    const [isShown, setIsShown] = useState(false);
    const [phone, setPhone] = useState('Телефон')
    const navigate = useNavigate()
    if(user.length>1){
        var arrObj = user;
        //console.log('users:',users)
           var arrstring = JSON.stringify(arrObj)
            const myArr = JSON.parse(arrstring);
            var firstname=''
            var secondname=''
            var city=''
            var phonenumber=''
            
           //console.log(service.author)
            for (var i = 0; i < myArr.length; i++) {
               
               var object = myArr[i];
               
   
               if(object.username===service?.username){
                   firstname=object.firstname
                   secondname=object.secondname
                   city=object.city
                   phonenumber=object.phonenumber
                   //console.log('obj username:',object.username)
                    //console.log('service username:',service.username)
                   //console.log('price:',price)
                   
               }
              
           }
    }
    
    
        
        
    if (!service || !user) {
        console.log('service',service)
        console.log('user',user)
        return (
            <div className='text-xl text-center text-black py-10'>
                Загрузка...
            </div>
        )
    }
    return (
        <Link to={`/service/${service._id}`}>
            <div className='flex flex-grow border-2 shadow-lg rounded-lg p-2'>
                <div className='leftcard flex-none'>
                <div
                    className={
                        service.imgUrl ? 'flex rouded-sm' : 'flex rounded-sm'
                    }
                >
                    {service.imgUrl && (
                        <img
                            src={`http://localhost:3002/${service.imgUrl}`}
                            alt='img'
                            className='object-cover h-40 w-40 rounded-lg'
                        />
                    )}
                </div>
                <div className='flex justify-around py-1 items-center '>
                    <button className='flex items-center justify-center gap-2 text-xs text-black opacity-50'>
                        <AiFillEye /> <span>{service.views}</span>
                    </button>
                    <button className='flex items-center justify-center gap-2 text-xs text-black opacity-50'>
                        <AiOutlineMessage />{' '}
                        <span>{service.comments?.length || 0} </span>
                    </button>
                </div>
                </div>
                
                <div className='rightcard flex-1 gap-2 w-64 pl-4'>
                <div className='flex justify-between items-center '>
                    <div className='text-2xl text-color font-bold opacity-100'>
                    {user.length>1?firstname:user.firstname} {user.length>1?secondname:user.secondname}
                    </div>
                </div>
                <div className='flex justify-between items-center '>
                <div className='text-small-color opacity-90 text-2xl  line-clamp-4'>{service.text}</div>
                {/* <hr style={{ width: "20%", border: "0.1px solid #ececec" }} /> */}
                <div className='text-small-color opacity-90 text-2xl  line-clamp-4'>{service.price} ₽</div>
                     
                </div>
               
               
                
                <div className='text-black text-m py-2'>{service.title}</div>
                <div className='flex justify-between'>
                <div className='text-cat-color opacity-90 text-xs  '>Категория: {service.category}</div>
                <div className='text-cat-color text-xs opacity-90 pb-1'>{user.length>1?city:user.city}</div>
                </div>
                <div className='flex justify-between'>

                    <div>
                    <div className='flex gap-10 text-black text-m pt-2'>
                <div className='flex flex-wrap justify-center content-center text-m font-bold min-w-[150px] rounded-lg btn-color p-1 text-white hover:bg-blue-800 shadow-lg shadow-blue-500/50'
        onMouseEnter={() => setPhone(user.length>1?phonenumber:user.phonenumber)}>
           <HiPhone className='my-1 mr-1'/>
        {phone}
      </div>
      
      <div className='flex text-m font-bold rounded-lg btn-color p-1 px-2 text-white hover:bg-blue-800 shadow-lg shadow-blue-500/50'
      onClick={() => navigate('/chats') }
        >
            <BsFillChatDotsFill className='my-1 mr-1' />
        Чат
      </div>
      
                </div>
                    </div>

                    <div className='align-text-bottom'>
                    <div className='text-xs text-black opacity-80 pt-6'>
                        <Moment  locale="ru" date={service.createdAt} format='D MMM YYYY' />
                    </div>
                    </div>

                </div>
                
                
                
                
                
                </div>
            </div>
        </Link>
    )
}
