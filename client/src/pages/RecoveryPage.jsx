import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import axios from '../utils/axios'

export const RecoveryPage = () => {
    const [username, setUsername] = useState('')
    const [firstname, setfirstname] = useState('')
    const [secondname, setsecondname] = useState('')
    const [phonenumber, setphonenumber] = useState('+7')
    const [password, setPassword] = useState('')
    const [btn, setBtn] = useState(false);
    

    const {  status } = useSelector((state) => state.auth)
    console.log('status',status)
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    var goodAuth, badAuth = ''
    console.log('isAuth',isAuth)
    //var btn = false;


    useEffect(() => {
        //if (status) toast(status)
        if (isAuth) {
        navigate('/') 
        goodAuth="Успешный вход"
        toast.info(goodAuth)

        //window.location.reload(false);
    }
    else{
        if(btn){
            badAuth="Неверный логин или пароль"
            toast.info(badAuth)
            //console.log('qqqqq')
        }
    }
    
    
    }, [status, isAuth, navigate])


    const handleSubmit = async () => {
        try {
            // dispatch(loginUser({ username, password }))
            // setBtn('true');
            
            
            const { data } = await axios.post('/auth/recovery', {
              
                username,
                firstname,
                secondname,
                phonenumber
            })

            console.log(data);
            
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className='w-1/4 h-70 mx-auto mt-40 border-2 shadow-lg rounded-lg p-2'
        >
            <h1 className='text-lg text-black text-center'>Восстановление пароля</h1>

            <h3 className='mt-2 text-xs opacity-80 '>Для подтверждения личности введите логин, имя, фамилию и номер телефона, указанные при регистрации</h3>
            <label className='text-xs text-gray-400'>
                Логин:
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Логин'
                    className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>
            
            <label className='text-xs text-gray-400'>
                Имя:
                <input
                    type='text'
                    value={firstname}
                    onChange={(e) => setfirstname(e.target.value)}
                    placeholder='Пароль'
                    className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>

            <label className='text-xs text-gray-400'>
                Фамилия:
                <input
                    type='text'
                    value={secondname}
                    onChange={(e) => setsecondname(e.target.value)}
                    placeholder='Пароль'
                    className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>

            <label className='text-xs text-gray-400'>
                Номер телефона:
                <input
                    type='text'
                    value={phonenumber}
                    onChange={(e) => setphonenumber(e.target.value)}
                    placeholder='Пароль'
                    className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>

            <div className='grid gap-4 mt-7 justify-center '>
                <div className='flex justify-center'>
                    <button
                    type='submit'
                    onClick={handleSubmit}
                    className='min-w-[100px]  text-center font-bold  text-white rounded-lg px-4 py-2 text-xs  btn-color p-1 cursor-pointer hover:bg-blue-800'
                >
                    Восстановить
                </button>
                </div>
                
                
                
            </div>
        </form>
    )
}
