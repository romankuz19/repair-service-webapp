import React from 'react'
import { useEffect } from 'react'
import { useState,useCallback } from 'react'

import axios from '../utils/axios'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { checkIsAuth, logout } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../redux/features/auth/authSlice'
import { Chat } from '../components/Chat.jsx'

export const MyProfilePage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [firstname, setName] = useState('')
    const [secondname, setSecondName] = useState('')
    const [city, setCity] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [user, setUser] = useState('')
    const [chats, setChats] = useState([])
    const [chatUsers, setChatUsers] = useState([])
    const [allMessages, setAllMessages] = useState([{}])
    const { status } = useSelector((state) => state.auth)

    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {

    setShowForm(!showForm);
  }
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuth = useSelector(checkIsAuth)
    const activeStyles = {
        color: 'white',
    }
    
    const fetchUser = useCallback(async () => {
        const { data } = await axios.get('/auth/me')
        //console.log(data.user.firstname)
       
        //console.log(data)
        //setPassword('')
        //setUsername('')
        //if(data.user.firstname!='')
        setName(data.user.firstname)
        //if(data.user.secondname!='')
        setSecondName(data.user.secondname)
        //if(data.user.city!='')
        setCity(data.user.city)
        //if(data.user.setPhonenumber!='')
        setPhonenumber(data.user.phonenumber)
        setUser(data.user)
    })
    useEffect(() => {
        if (status) toast.info(status)
        fetchUser()
    },[status])
    
    
    
    const handleSubmit = () => {
        try {
            
            if(phonenumber.toString().length != 11) toast.info('Некорректный номер телефона')
            else{
                dispatch(updateUser({ firstname,secondname,city,phonenumber }))
                // setPassword('')
                // setUsername('')
                setName('')
                setSecondName('')
                setCity('')
                setPhonenumber('')
            }
           
        } catch (error) {
            console.log(error)
        }
    }
    const getChats = async () =>{
        try {
            const { data } = await axios.get('/chat/getchats')    
            // const { data } = await axios.get(`/chat/getchats`,{
                
            // //     {
            // //     firstUserId: currentUser._id,
            // //     secondUserId: user[0]._id,
            //  }
            // )
       // console.log('user',user[0]._id)
       // console.log('curuser',currentUser._id)
        
        //setChat(checkchat)        
        //return checkchat[0]
        //console.log('messages',data[0].messages)
        //console.log('dada',data)
        setChats(data.filteredChats)
        setChatUsers(data.filteredUsers)
       // console.log('dada',chats)
        //setTimeout(getMessages, 2000);
        //getMessages()
            
        } catch (error) {
            console.log(error)
        }
    }
    
    //console.log(user._id)
    //console.log('allchats',chats)
    console.log('all chat users', chatUsers)
   
    return (
        <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
            {isAuth && (
                <>
                
                <div className='w-1/2  mx-auto form-contanier flex items-center flex-col gap-5  '>
                {/* <button className='max-w-[200px] items-center font-bold  rounded-lg btn-color text-white hover:bg-blue-800 px-4 py-2' onClick={handleShowForm}>
                        Изменить данные
                    </button> */}
                    
                    {/* {showForm && ( */}
        <form
        onSubmit={(e) => e.preventDefault()}
        className='border-2 shadow-lg rounded-lg p-2'
    >
        <h1 className='text-lg text-black text-center'>Мои данные</h1>


        <label className='text-xs text-gray-600'>
            Имя:
            <input
                type='text'
                value={firstname}
                onChange={(e) => setName(e.target.value)}
                placeholder='Имя'
                className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
            />
        </label>
        <label className='text-xs text-gray-600'>
            Фамилия:
            <input
                type='text'
                value={secondname}
                onChange={(e) => setSecondName(e.target.value)}
                placeholder='Фамилия'
                className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
            />
        </label>
        <label className='text-xs text-gray-600'>
            Город:
            <input
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder='Город'
                className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
            />
        </label>
        <label className='text-xs text-gray-600'>
            Номер телефона:
            <input
                type='number'
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
                placeholder='Номер телефона'
                className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
            />
        </label>

        <div className='flex gap-8 justify-center mt-4'>
            <button
                type='submit'
                onClick={handleSubmit}
                className='flex justify-center items-center btn-color text-l text-white rounded-lg py-2 px-4 hover:bg-blue-800 font-bold'
            >
                Изменить
            </button>
            <button
                type='submit'
                onClick={fetchUser}
                className='flex justify-center items-center bg-red-500 text-l text-white rounded-lg py-2 px-4 hover:text-black font-bold'
            >
                Отменить
            </button>
        </div>
    </form>
                    {/* )} */}

                    
                

                </div>
                <ul className='grid grid-cols-2 gap-4  justify-items-center 2xl:flex justify-center gap-8   '>
                    
                    <button className='max-w-[200px] items-center   font-bold  rounded-lg btn-color text-white hover:bg-blue-800 px-4 py-2' onClick={()=>navigate('/services/my-services')}>
                    Мои услуги
                    </button>
                    <button className='max-w-[200px]  items-center  font-bold  rounded-lg btn-color text-white hover:bg-blue-800 px-4 py-2' onClick={()=>navigate('/tasks/my-tasks')}>
                    Мои заказы
                    </button>
                    <button className='max-w-[200px] items-center  font-bold  rounded-lg btn-color text-white hover:bg-blue-800 px-4 py-2' onClick={()=>navigate('/services/create-service')}>
                    Добавить услугу
                    </button>
                    <button className='max-w-[200px]  items-center  font-bold  rounded-lg btn-color text-white hover:bg-blue-800 px-4 py-2' onClick={()=>navigate('/tasks/create-task')}>
                    Создать заказ
                    </button>

                </ul>
                

        
                </>
                
            )}

            {/* {user.admin?<div>Я админ</div>:<div>Я не админ</div>} */}


            <div className='grid grid-cols-2 grid-flow-row gap-4'>
              {isAuth && chats.length!==0 && ( 
                
                chats?.map((chat , idx) => (
                    
                <Chat chat={chat} curuser={user} chatUsers={chatUsers} key={idx} />
            )))
            
            }   
            </div>


        </div>
    )
}
