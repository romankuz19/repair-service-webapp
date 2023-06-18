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
            className='w-1/3 h-70 mx-auto mt-20 border-2 shadow-lg rounded-lg p-2'
        >
            <h1 className='text-2xl text-black text-center'>Авторизация</h1>
            <label className='text-m text-gray-400'>
                Введите логин:
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Логин'
                    className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-m outline-none placeholder:text-gray-700'
                />
            </label>
            
            <label className='text-m text-gray-400'>
                Введите пароль:
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Пароль'
                    className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-m outline-none placeholder:text-gray-700'
                />
            </label>

            <div className='mt-3 text-m font-bold cursor-pointer hover:underline'
            onClick={() => navigate('/recovery')}>
                Забыли пароль?
            </div>

            <div className='grid gap-4 mt-7 justify-center lg:grid-cols-2 md:grid-cols-1'>
                <div className='flex justify-center'>
                    <button
                    type='submit'
                    onClick={handleSubmit}
                    className='min-w-[100px]  text-center font-bold  text-white rounded-lg px-4 py-2 text-m  btn-color p-1 cursor-pointer hover:bg-blue-800'
                >
                    Вход
                </button>
                </div>
                <div className='flex justify-center'>
                <Link
                    to='/register'
                    className='min-w-[100px]  text-center font-bold  text-white rounded-lg px-4 py-2 text-m btn-color p-1 cursor-pointer hover:bg-blue-800'
                >
                    Регистрация
                </Link>
                </div>
                
                
            </div>
        </form>
    )
}
