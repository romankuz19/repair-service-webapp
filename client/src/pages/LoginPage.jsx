import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

export const LoginPage = () => {
    const [username, setUsername] = useState('')
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


    const handleSubmit = () => {
        try {
            dispatch(loginUser({ username, password }))
            setBtn('true');
            
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className='w-1/4 h-60 mx-auto mt-40 border-2 shadow-lg rounded-lg p-2'
        >
            <h1 className='text-lg text-black text-center'>Авторизация</h1>
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
                Пароль:
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Пароль'
                    className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>

            <div className='flex gap-8 justify-center mt-7'>
                <button
                    type='submit'
                    onClick={handleSubmit}
                    className='font-bold text-white rounded-lg px-4 py-2 text-xs  btn-color p-1 cursor-pointer hover:bg-blue-800'
                >
                    Вход
                </button>
                <Link
                    to='/register'
                    className='font-bold text-white rounded-lg px-4 py-2 text-xs btn-color p-1 cursor-pointer hover:bg-blue-800'
                >
                    Регистрация
                </Link>
            </div>
        </form>
    )
}
