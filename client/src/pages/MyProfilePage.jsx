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
import { AiFillEye } from 'react-icons/ai'
import chatIcon from '../images/chat-icon.png';
import { SupportChat } from '../components/SupportChat'

export const MyProfilePage = () => {
    const [username, setUsername] = useState('')
    const regexp = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/
    const [pasType, setPasType] = useState('password')
    const [firstname, setName] = useState('')
    const [secondname, setSecondName] = useState('')
    const [city, setCity] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [user, setUser] = useState('')
    const [chats, setChats] = useState([])
    const [chatUsers, setChatUsers] = useState([])
    const [allMessages, setAllMessages] = useState([{}])
    const [password, setPassword] = useState('')
    const [passwordOld, setPasswordOld] = useState('')
    const [password2, setPassword2] = useState('')
    const [changePersonal, setChangePersonal] = useState(false);
    const [changePas, setChangePas] = useState(false);
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
        setPassword(data.password)
        console.log(data)
    })
    useEffect(() => {
        if (status) toast.info(status)
        fetchUser()
    },[status])
    
    
    
    const handleSubmit = () => {
        try {
            if(changePersonal){
                if(phonenumber.toString().length != 11)toast.info("Некорректный номер телефона")
                else{
                    dispatch(updateUser({ firstname,secondname,city,phonenumber }))
                    // setPassword('')
                    // setUsername('')
                    setName('')
                    setSecondName('')
                    setCity('')
                    setPhonenumber('')
                }
            }
            if(changePas){

                console.log(password, password2)
                if(passwordOld.length == 0)toast.info("Неверный пароль")

                else if(password !== password2)toast.info("Пароли не совпадают!")
                else{
                    if(password.length<8) toast.info("Пароль слишком короткий")
                    else if(password.match(regexp) === null) toast.info("Некорректный пароль." + "\n Пароль должен содержать: хотя бы одно число, один спецсимвол, заглавную и строчную латинские буквы")
                    else{
                        console.log('enter')
                        const data = axios.post('/auth/change-password', {
                            userId: user._id,
                            password: password,
                            passwordOld: passwordOld})

                            data.then((a) => {
                                toast.info(a.data.message)
                              });
                              //window.location.reload();
                              setPassword('')
                              setPassword2('')
                              setPasswordOld('')
                              setChangePas(false)
                    }
                
                }
              
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

    const handleSupportChat = async () => {

        const { data }  = await axios.get('/auth/admin-id')
        console.log(data)
        var adminId = data._id

        await axios.post(`/chat/create`, {
            firstUserId: user._id,
            secondUserId: adminId,
        })
        navigate(`/chats/?id=${adminId}`)
        //navigate("/chats")
    }
    
    //console.log(user._id)
    //console.log('allchats',chats)
    console.log('user', user._id)
   
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
        

                   <div className='flex justify-around gap-4'>
                   <div >
                        <button className='font-bold text-m underline'
                        onClick={ () => changePersonal == false ? setChangePersonal(true) : setChangePersonal(false)}
                        >
                            Изменить личные данные
                        </button>
                    </div>

                    <div>
                        <button className='font-bold text-m underline'
                        onClick={ () => changePas == false ? setChangePas(true) : setChangePas(false)}
                        >
                            Сменить пароль
                        </button>
                    </div>
                   </div>
                    

                    {changePersonal == true && (
                        <>
                        <h1 className='text-2xl text-black text-center mt-3'>Мои данные</h1>
                        <label className='text-m text-gray-600'>
                                    Имя:
                                    <input
                                        type='text'
                                        value={firstname}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder='Имя'
                                        className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-m outline-none placeholder:text-gray-700' />
                                </label><label className='text-m text-gray-600'>
                                        Фамилия:
                                        <input
                                            type='text'
                                            value={secondname}
                                            onChange={(e) => setSecondName(e.target.value)}
                                            placeholder='Фамилия'
                                            className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-m outline-none placeholder:text-gray-700' />
                                    </label><label className='text-m text-gray-600'>
                                        Город:
                                        <input
                                            type='text'
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            placeholder='Город'
                                            className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-m outline-none placeholder:text-gray-700' />
                                    </label><label className='text-m text-gray-600'>
                                        Номер телефона:
                                        <input
                                            type='number'
                                            value={phonenumber}
                                            onChange={(e) => setPhonenumber(e.target.value)}
                                            placeholder='Номер телефона'
                                            className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-m outline-none placeholder:text-gray-700' />
                                    </label></>

                    )}

                    {changePas == true && (
                         <>
                         <h1 className='text-2xl text-black text-center mt-3'>Смена пароля</h1>

                         <div className="relative text-m my-2">
                                    Введите старый пароль
                                    <input
                                        type={pasType}
                                        className="block w-full  text-black rounded-lg bg-blue-100 border py-1 px-2 text-m outline-none placeholder:text-gray-700"
                                        placeholder="Старый пароль"
                                        value={passwordOld}
                                        onChange={(e) => setPasswordOld(e.target.value)}>


                                    </input>

                                    <div>

                                        <button onMouseEnter={() => setPasType('text')} onMouseLeave={() => setPasType('password')} className="absolute right-1 bottom-2 ">
                                            <AiFillEye />
                                        </button>

                                    </div>

                                </div>
                         <div className="relative text-m my-2">
                                    Введите новый пароль
                                    <input
                                        type={pasType}
                                        className="block w-full  text-black rounded-lg bg-blue-100 border py-1 px-2 text-m outline-none placeholder:text-gray-700"
                                        placeholder="Новый пароль"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}>


                                    </input>

                                    <div>

                                        <button onMouseEnter={() => setPasType('text')} onMouseLeave={() => setPasType('password')} className="absolute right-1 bottom-2 ">
                                            <AiFillEye />
                                        </button>

                                    </div>

                                </div>
                                
                                <div className="relative text-m my-2 ">
                                        Введите новый пароль еще раз:
                                        <input
                                            type={pasType}
                                            className="block w-full  text-black rounded-lg bg-blue-100 border py-1 px-2 text-m outline-none placeholder:text-gray-700"
                                            placeholder="Новый пароль повторно"
                                            value={password2}
                                            onChange={(e) => setPassword2(e.target.value)}>


                                        </input>

                                        <div>

                                            <button onMouseEnter={() => setPasType('text')} onMouseLeave={() => setPasType('password')} className="absolute right-1 bottom-2 ">
                                                <AiFillEye />
                                            </button>

                                        </div>

                                    </div></>
                    )}

        {(changePas == true || changePersonal == true) && (
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
        </div>) }
        
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
            {/* <div className='absolute bottom-10 right-10 text-xs items-center flex flex-col gap-2 justify-center cursor-pointer'
            onClick={handleSupportChat}>
            <div className='flex items-center '>
                <img className='w-10 h-10' src={chatIcon} alt="" />
                {}
            </div>
            <div>
                Есть вопросы? <br /> Напишите нам!
                </div>
            </div> */}

            <SupportChat
            userId = {user?._id}
            />
            


            {/* <div className='grid grid-cols-2 grid-flow-row gap-4'>
              {isAuth && chats.length!==0 && ( 
                
                chats?.map((chat , idx) => (
                    
                <Chat chat={chat} curuser={user} chatUsers={chatUsers} key={idx} />
            )))
            
            }   
            </div> */}


        </div>
    )
}
