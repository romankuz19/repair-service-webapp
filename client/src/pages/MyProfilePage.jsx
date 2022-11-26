import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { PostItem } from '../components/PostItem'
import axios from '../utils/axios'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { checkIsAuth, logout } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/features/auth/authSlice'

export const MyProfilePage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setName] = useState('')
    const [secondname, setSecondName] = useState('')
    const [city, setCity] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const { status } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuth = useSelector(checkIsAuth)
    const activeStyles = {
        color: 'white',
    }
    const handleSubmit = () => {
        try {
            dispatch(registerUser({ username, password,firstname,secondname,city,phonenumber }))
            setPassword('')
            setUsername('')
            setName('')
            setSecondName('')
            setCity('')
            setPhonenumber('')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
            {isAuth && (
                <><ul className='flex flex-col gap-8'>

                    <li>
                        <NavLink
                            to={'/posts'}
                            href='/'
                            className='text-xs font-bold text-black-400 hover:text-white rounded-lg bg-pink-200 px-4 py-2'
                            style={({ isActive }) => isActive ? activeStyles : undefined}
                        >
                            Мои услуги
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/new'}
                            href='/'
                            className='text-xs font-bold text-black-400 hover:text-white rounded-lg bg-pink-200 px-4 py-2'
                            style={({ isActive }) => isActive ? activeStyles : undefined}
                        >
                            Добавить услугу
                        </NavLink>
                    </li>
                </ul>
                <form
            onSubmit={(e) => e.preventDefault()}
            className='w-1/2  mx-auto '
        >
            <h1 className='text-lg text-black text-center'>Мои данные</h1>

            <label className='text-xs text-gray-400'>
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
            </label>
            <label className='text-xs text-gray-400'>
                Имя:
                <input
                    type='text'
                    value={firstname}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Имя'
                    className='mt-1 text-black w-full rounded-lg bg-pink-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>
            <label className='text-xs text-gray-400'>
                Фамилия:
                <input
                    type='text'
                    value={secondname}
                    onChange={(e) => setSecondName(e.target.value)}
                    placeholder='Фамилия'
                    className='mt-1 text-black w-full rounded-lg bg-pink-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>
            <label className='text-xs text-gray-400'>
                Город:
                <input
                    type='text'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder='Город'
                    className='mt-1 text-black w-full rounded-lg bg-pink-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>
            <label className='text-xs text-gray-400'>
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
                    className='font-bold bg-pink-200 text-xs text-black rounded-lg px-4 py-2 text-xs font-bold text-black-400 hover:text-white'
                >
                    Подтвердить
                </button>
                <Link
                    to='/login'
                    className='font-bold bg-pink-200 text-xs text-black rounded-lg px-4 py-2 text-xs font-bold text-black-400 hover:text-white'
                >
                    Уже зарегистрированы ?
                </Link>
            </div>
        </form>
                
                </>
                
            )}
        </div>
    )
}
