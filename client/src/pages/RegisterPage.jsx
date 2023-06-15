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
    const [phoneNumber, setPhonenumber] = useState('')
    const [secretQuestion, setSecretQuestion] = useState('')
    const [secretQuestionAnswer, setSecretQuestionAnswer] = useState('')
    const { status } = useSelector((state) => state.auth)
    const regexp = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/
    const usernameRegex = /^[a-zA-Z0-9]+$/;

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
            console.log(phoneNumber.length)
            if(username.length<3 )toast.info("Логин слишком короткий")
            else if(password.length<8) toast.info("Пароль слишком короткий")
            else if(password.match(regexp) === null) toast.info("Некорректный пароль")
            else if(username.match(usernameRegex) === null) toast.info("Некорректный логин")
            else if(phoneNumber.length != 11) toast.info("Некорректный номер телефона")
            else if (firstname.length < 3) toast.info("Некорректное имя")
            else if (secondname.length < 3) toast.info("Некорректная фамилия")
            else{
            dispatch(registerUser({ username, password,firstname,secondname,city,phoneNumber,secretQuestion, secretQuestionAnswer }))
            setPassword('')
            setUsername('')
            setName('')
            setSecondName('')
            setCity('')
            setPhonenumber('')
            setSecretQuestion('')
            setSecretQuestionAnswer('')
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
                    value={phoneNumber}
                    onChange={(e) => setPhonenumber(e.target.value)}
                    placeholder='Номер телефона'
                    className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>

            <label className='text-xs text-gray-400'>
                Введите секретный вопрос:
                <input
                    type='text'
                    value={secretQuestion}
                    onChange={(e) => setSecretQuestion(e.target.value)}
                    placeholder='Например: "Кличка собаки"'
                    className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>

            <label className='text-xs text-gray-400'>
                Введите ответ на секретный вопрос:
                <input
                    type='text'
                    value={secretQuestionAnswer}
                    onChange={(e) => setSecretQuestionAnswer(e.target.value)}
                    placeholder=''
                    className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>

            
            <div className='grid gap-4 mt-7 justify-center xl:grid-cols-2 lg:grid-cols-1'>
                <div className='flex justify-center'>
                    <button
                    type='submit'
                    onClick={handleSubmit}
                    className='  text-center font-bold  text-white rounded-lg px-4 py-2 text-xs  btn-color p-1 cursor-pointer hover:bg-blue-800'
                >
                    Подтвердить
                </button>
                </div>
                <div className='flex justify-center'>
                <Link
                    to='/login'
                    className='  text-center font-bold  text-white rounded-lg px-4 py-2 text-xs btn-color p-1 cursor-pointer hover:bg-blue-800'
                >
                    Есть аккаунт ?
                </Link>
                </div>
                
                
            </div>
        </form>
    )
}
