import React from 'react'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState,useCallback } from 'react'
import axios from '../utils/axios'

export const PostItem = ({ post, user }) => {

    //console.log('firstname:',firstname)
    //console.log('users',user)
    //console.log('post',post)
    //console.log('user length',user.username)
    const [isShown, setIsShown] = useState(false);
    if(user.length>1){
        var arrObj = user;
        //console.log('users:',users)
           var arrstring = JSON.stringify(arrObj)
            const myArr = JSON.parse(arrstring);
            var firstname=''
            var secondname=''
            var city=''
            var phonenumber=''
            
           //console.log(post.author)
            for (var i = 0; i < myArr.length; i++) {
               
               var object = myArr[i];
               
   
               if(object.username===post.username){
                   firstname=object.firstname
                   secondname=object.secondname
                   city=object.city
                   phonenumber=object.phonenumber
                   //console.log('obj username:',object.username)
                    //console.log('post username:',post.username)
                   //console.log('price:',price)
                   
               }
              
           }
    }
    
    
        
        
    if (!post || !user) {
        console.log('post',post)
        console.log('user',user)
        return (
            <div className='text-xl text-center text-black py-10'>
                Загрузка...
            </div>
        )
    }
    return (
        <Link to={`/service/${post._id}`}>
            <div className='flex flex-grow border-2 border-pink-200 rounded-lg p-2'>
                <div className='leftcard flex-none'>
                <div
                    className={
                        post.imgUrl ? 'flex rouded-sm' : 'flex rounded-sm'
                    }
                >
                    {post.imgUrl && (
                        <img
                            src={`http://localhost:3002/${post.imgUrl}`}
                            alt='img'
                            className='object-cover h-40 w-40 rounded-lg'
                        />
                    )}
                </div>
                <div className='flex justify-around py-1 items-center '>
                    <button className='flex items-center justify-center gap-2 text-xs text-black opacity-50'>
                        <AiFillEye /> <span>{post.views}</span>
                    </button>
                    <button className='flex items-center justify-center gap-2 text-xs text-black opacity-50'>
                        <AiOutlineMessage />{' '}
                        <span>{post.comments?.length || 0} </span>
                    </button>
                </div>
                </div>
                
                <div className='rightcard flex-1 w-64 pl-4'>
                <div className='flex justify-between items-center '>
                    <div className='text-2xl text-blue-600 font-bold opacity-100'>
                    {user.length>1?firstname:user.firstname} {user.length>1?secondname:user.secondname}
                    </div>
                    <button className='text-m text-black font-bold opacity-100 rounded-lg bg-pink-100 p-1' onMouseEnter={() => setIsShown(true)}>
                       Телефон  {isShown && (
        <>
          {user.length>1?phonenumber:user.phonenumber}
        </>
      )}
                    </button>

                    
                    <div className='text-xs text-black opacity-80'>
                        <Moment date={post.createdAt} format='D MMM YYYY' />
                    </div>
                </div>
                <div className='flex justify-between items-center '>
                <div className='text-blue-500 opacity-90 text-xl  line-clamp-4'>{post.text}</div>
                <div className='text-blue-500 opacity-90 text-xl  line-clamp-4'>{post.price} ₽</div>
                     
                </div>
                <div className='text-blue-500 opacity-90 text-m  '>Категория: {post.category}</div>
                <div className='text-black text-m'>{post.title}</div>
                <div className='text-black text-m'>{user.length>1?city:user.city}</div>
                
                
                
                </div>
            </div>
        </Link>
    )
}
