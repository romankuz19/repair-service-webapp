import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, checkIsAuth } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

export const RegisterPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setName] = useState('')
    const [secondname, setSecondName] = useState('')
    const [city, setCity] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const { status } = useSelector((state) => state.auth)
    console.log('status',status)
    const isAuth = useSelector(checkIsAuth)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (status) {
            toast.info(status)
        }
        if (isAuth) {navigate('/') 
        //window.location.reload(false);
    }
    }, [status, isAuth, navigate])

    const handleSubmit = () => {
        try {
            if(username.length<3 )toast.info("Логин слишком короткий или пустой")
            else if(password.length<8) toast.info("Пароль слишком короткий")
            else{
            dispatch(registerUser({ username, password,firstname,secondname,city,phonenumber }))
            setPassword('')
            setUsername('')
            setName('')
            setSecondName('')
            setCity('')
            setPhonenumber('')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className='w-1/4 mx-auto mt-40 border-2 shadow-lg rounded-lg p-2'
        >
            <h1 className='text-lg text-black text-center'>Регистрация</h1>

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
            <label className='text-xs text-gray-400'>
                Имя:
                <input
                    type='text'
                    value={firstname}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Имя'
                    className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>
            <label className='text-xs text-gray-400'>
                Фамилия:
                <input
                    type='text'
                    value={secondname}
                    onChange={(e) => setSecondName(e.target.value)}
                    placeholder='Фамилия'
                    className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>
            <label className='text-xs text-gray-400'>
                Город:
                <input
                    type='text'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder='Город'
                    className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>
            <label className='text-xs text-gray-400'>
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
                    className='font-bold  text-xs text-white rounded-lg px-4 py-2 btn-color p-1 cursor-pointer hover:bg-blue-800'
                >
                    Подтвердить
                </button>
                <Link
                    to='/login'
                    className='font-bold text-xs text-white rounded-lg px-4 py-2 btn-color p-1 cursor-pointer hover:bg-blue-800'
                >
                    Уже зарегистрированы ?
                </Link>
            </div>
        </form>
    )
}
