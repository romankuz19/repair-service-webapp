import React from 'react'
import { useEffect } from 'react'
import { useState,useCallback } from 'react'
import { PostItem } from '../components/PostItem'
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
        if (status) toast(status)
        fetchUser()
    },[status])
    
    
    
    const handleSubmit = () => {
        try {
            dispatch(updateUser({ firstname,secondname,city,phonenumber }))
            // setPassword('')
            // setUsername('')
            setName('')
            setSecondName('')
            setCity('')
            setPhonenumber('')
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
                <><ul className='grid justify-items-center grid-cols-2 gap-8'>

                    <li>
                        <NavLink
                            to={'/myservices'}
                            href='/'
                            className='text-l font-bold text-black-400  hover:text-white rounded-lg bg-pink-200 px-4 py-2'
                            style={({ isActive }) => isActive ? activeStyles : undefined}
                        >
                            Мои услуги
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/createservice'}
                            href='/'
                            className='text-l font-bold text-black-400 hover:text-white rounded-lg bg-pink-200 px-4 py-2'
                            style={({ isActive }) => isActive ? activeStyles : undefined}
                        >
                            Добавить услугу
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/createtask'}
                            href='/'
                            className='text-l font-bold text-black-400 hover:text-white rounded-lg bg-pink-200 px-4 py-2'
                            style={({ isActive }) => isActive ? activeStyles : undefined}
                        >
                            Создать задание
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/mytasks'}
                            href='/'
                            className='text-l font-bold text-black-400 hover:text-white rounded-lg bg-pink-200 px-4 py-2'
                            style={({ isActive }) => isActive ? activeStyles : undefined}
                        >
                             Мои задания
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'#'}
                            href='/'
                            onClick={getChats}
                            className='text-l font-bold text-black-400 hover:text-white rounded-lg bg-pink-200 px-4 py-2 hover:text-black'
                            
                        >
                            Мои чаты
                        </NavLink>
                    </li>
                </ul>
                <form
            onSubmit={(e) => e.preventDefault()}
            className='w-1/2  mx-auto '
        >
            <h1 className='text-lg text-black text-center'>Мои данные</h1>

            {/* <label className='text-xs text-gray-400'>
                Логин:
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Логин'
                    className='read-only:bg-gray-100 mt-1 text-black w-full rounded-lg bg-pink-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>

            <label className='text-xs text-gray-400'>
                Пароль:
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Пароль'
                    className='read-only:bg-gray-100 mt-1 text-black w-full rounded-lg bg-pink-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label> */}
            <label className='text-xs text-gray-600'>
                Имя:
                <input
                    type='text'
                    value={firstname}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Имя'
                    className='mt-1 text-black w-full rounded-lg bg-pink-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>
            <label className='text-xs text-gray-600'>
                Фамилия:
                <input
                    type='text'
                    value={secondname}
                    onChange={(e) => setSecondName(e.target.value)}
                    placeholder='Фамилия'
                    className='mt-1 text-black w-full rounded-lg bg-pink-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>
            <label className='text-xs text-gray-600'>
                Город:
                <input
                    type='text'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder='Город'
                    className='mt-1 text-black w-full rounded-lg bg-pink-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>
            <label className='text-xs text-gray-600'>
                Номер телефона:
                <input
                    type='number'
                    value={phonenumber}
                    onChange={(e) => setPhonenumber(e.target.value)}
                    placeholder='Номер телефона'
                    className='mt-1 text-black w-full rounded-lg bg-pink-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>

            <div className='flex gap-8 justify-center mt-4'>
                <button
                    type='submit'
                    onClick={handleSubmit}
                    className='flex justify-center items-center bg-blue-600 text-l text-white rounded-lg py-2 px-4 hover:text-black'
                >
                    Изменить
                </button>
                <button
                    type='submit'
                    onClick={fetchUser}
                    className='flex justify-center items-center bg-red-500 text-l text-white rounded-lg py-2 px-4 hover:text-black'
                >
                    Отменить
                </button>
            </div>
        </form>
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
