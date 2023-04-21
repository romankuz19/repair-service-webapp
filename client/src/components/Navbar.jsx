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
        toast.info('Вы вышли из системы')
    }

    return (
        <div className='flex pt-10 pl-20 pr-20 justify-between items-center'>
            <div className='flex gap-8 '>
            <div className='flex justify-center items-center font-bold btn-color rounded-lg px-4 py-2 hover:bg-blue-800 shadow-lg shadow-blue-500/50'>
                {
                    <><NavLink
                        to={'/'}
                        href='/'
                        className=' text-l font-bold text-white '
                        
                    >
                        Услуги
                    </NavLink>
                    </>
                }
            </div>

            <div className='flex justify-center items-center font-bold btn-color rounded-lg px-4 py-2 hover:bg-blue-800 shadow-lg shadow-blue-500/50'>
                {
                    <><NavLink
                        to={'/tasks'}
                        href='/tasks'
                        className=' text-l font-bold text-white '
                        
                    >
                        Заказы
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
                            className='text-l font-bold text-white '
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
                            className='text-l font-bold text-white '
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
                    <div className='flex justify-center items-center font-bold btn-color rounded-lg px-4 py-2 hover:bg-blue-800 shadow-lg shadow-blue-500/50'>
                    <NavLink
                        to={'/chats'}
                        href='/'
                        className='text-l font-bold text-white '
                        
                    >
                        Чаты
                    </NavLink>
                    </div>
                    
                    <>
                    <div className='flex justify-center items-center font-bold btn-color rounded-lg px-4 py-2 hover:bg-blue-800 shadow-lg shadow-blue-500/50'>
                    <NavLink
                        to={'/profile'}
                        href='/'
                        className='text-l font-bold text-white '
                        
                    >
                        Мой профиль
                    </NavLink>

                    </div>
                    
                    </>
                    <>
                    <div className='flex justify-center items-center font-bold btn-color rounded-lg px-4 py-2 hover:bg-blue-800 shadow-lg shadow-blue-500/50'>
                    <NavLink
                        to={'/'}
                        href='/'
                        onClick={logoutHandler}
                        className='text-l font-bold text-white  '
                        
                    >
                        Выйти
                    </NavLink>

                    </div>
                    
                    </>
                   
                    </>
                : 
                <>
                <div className='flex justify-center items-center font-bold btn-color rounded-lg px-4 py-2 hover:bg-blue-800 shadow-lg shadow-blue-500/50'>
                    <NavLink
                    to={'/login'}
                    href='/'
        
                    className='text-l font-bold text-white '
                    // style={({ isActive }) => isActive ? activeStyles : undefined}
                >
                    Войти
                </NavLink>
                </div>
                    
            </>
                }
            </div>
            
        </div>
    )
}
