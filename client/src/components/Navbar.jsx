import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, logout } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

export const Navbar = () => {
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()

    const activeStyles = {
        color: 'white',
    }

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast('Вы вышли из системы')
    }

    return (
        <div className='flex pt-10 pl-20 pr-20 justify-between items-center'>
            <div className='flex gap-8 '>
            <div className='flex justify-center items-center font-bold bg-pink-200 rounded-lg px-4 py-2'>
                {
                    <><NavLink
                        to={'/'}
                        href='/'
                        className='da text-l font-bold text-black-400 hover:text-white'
                        
                    >
                        Услуги
                    </NavLink>
                    </>
                }
            </div>

            <div className='flex justify-center items-center font-bold bg-pink-200 rounded-lg px-4 py-2'>
                {
                    <><NavLink
                        to={'/tasks'}
                        href='/tasks'
                        className='da text-l font-bold text-black-400 hover:text-white'
                        
                    >
                        Задания
                    </NavLink>
                    </>
                }
            </div>

            </div>
             
            {/* <span className='flex justify-center items-center w-6 h-6 bg-gray-600 text-l text-white rounded-sm'>
                Мой профиль
            </span> */}

            {/* {isAuth && (
                <ul className='flex pl-8 gap-8'>
                    
                    <li>
                        <NavLink
                            to={'/posts'}
                            href='/'
                            className='text-l font-bold text-black-400 hover:text-white'
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Мои услуги
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/new'}
                            href='/'
                            className='text-l font-bold text-black-400 hover:text-white'
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Добавить услугу
                        </NavLink>
                    </li>
                </ul>
            )} */}

            <div className='flex gap-8 '>
                {isAuth ? 
                    <>
                    <NavLink
                        to={'/chats'}
                        href='/'
                        className='font-bold bg-pink-200 text-l text-black rounded-lg px-4 py-2 text-l font-bold text-black-400 hover:text-white'
                        
                    >
                        Чаты
                    </NavLink>
                    <>
                    <NavLink
                        to={'/myprofile'}
                        href='/'
                        className='font-bold bg-pink-200 text-l text-black rounded-lg px-4 py-2 text-l font-bold text-black-400 hover:text-white'
                        
                    >
                        Мой профиль
                    </NavLink>
                    </>
                    <><NavLink
                        to={'/'}
                        href='/'
                        onClick={logoutHandler}
                        className='font-bold bg-pink-200 text-l text-black rounded-lg px-4 py-2 text-l font-bold text-black-400 hover:text-white'
                        
                    >
                        Выйти
                    </NavLink>
                    </>
                   
                    </>
                : 
                <><NavLink
                to={'/login'}
                href='/'
    
                className='font-bold bg-pink-200 text-l text-black rounded-lg px-4 py-2 text-l font-bold text-black-400 hover:text-white'
                // style={({ isActive }) => isActive ? activeStyles : undefined}
            >
                Войти
            </NavLink>
            </>
                }
            </div>
            
        </div>
    )
}
