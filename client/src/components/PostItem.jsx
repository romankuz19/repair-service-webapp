import React from 'react'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState,useCallback } from 'react'
import axios from '../utils/axios'

export const PostItem = ({ post, user }) => {
    const dispatch = useDispatch()
    const { users } = useSelector((state) => state.post)
    // const [firstname, setName] = useState('')
    // const [secondname, setSecondName] = useState('')
    // const [city, setCity] = useState('')
    // const [phonenumber, setPhonenumber] = useState('')
    // const fetchUser = async () => {
    //     const { data } = await axios.get('/auth/me')
    //     //console.log(data)
    //     setName(data.user.firstname)
    //     setSecondName(data.user.secondname)
    //     setCity(data.user.city)
    //     setPhonenumber(data.user.phonenumber)
    // }
    // useEffect(() => {
    //     fetchUser()
    // },[])

    //console.log('firstname:',firstname)
    console.log(users)
    if(users.length!=0){
        var arrObj = users;
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
               console.log('obj username:',object.username)
               console.log('post username:',post.username)
   
               if(object.username===post.username){
                   firstname=object.firstname
                   secondname=object.secondname
                   city=object.city
                   phonenumber=object.phonenumber
                   
                   //console.log('price:',price)
                   
               }
              
           }
    }
    
    
        
        
    if (!post) {
        return (
            <div className='text-xl text-center text-black py-10'>
                Загрузка...
            </div>
        )
    }
    return (
        <Link to={`/${post._id}`}>
            <div className='flex flex-grow'>
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
                        {firstname} {secondname} 
                        
                    </div>
                    <div className='text-m text-blue-600 font-bold opacity-100'>
                       Телефон: {phonenumber}
                    </div>
                    
                    <div className='text-xs text-black opacity-80'>
                        <Moment date={post.createdAt} format='D MMM YYYY' />
                    </div>
                </div>
                
                <div className='text-black text-m'>{city}</div>
                <div className='text-black text-m'>{post.title}</div>
                
                <div className='flex justify-between items-center '>
                <div className='text-blue-500 opacity-90 text-xl  line-clamp-4'>{post.text}</div>

                <div className='text-blue-500 opacity-90 text-xl  line-clamp-4'>{post.price} ₽</div>
                     
                </div>
                </div>
            </div>
        </Link>
    )
}
