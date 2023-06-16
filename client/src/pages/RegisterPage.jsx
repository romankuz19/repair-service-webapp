import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, checkIsAuth } from '../redux/features/auth/authSlice'
import { AiFillEye } from 'react-icons/ai'
import { toast } from 'react-toastify'

export const RegisterPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [firstname, setName] = useState('')
    const [secondname, setSecondName] = useState('')
    const [city, setCity] = useState('')
    const [pasType, setPasType] = useState('password')
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
            if(username.length<3 )toast.info("Логин менее 3-х символов ")
            else if(username.match(usernameRegex) === null) toast.info("Некорректный логин. Логин может включать только цифры и латинские буквы")
            else if(password.length<8) toast.info("Пароль менее 8-ми символов")
            else if(password.match(regexp) === null) toast.info("Некорректный пароль." + "\n Пароль должен содержать: хотя бы одно число, один спецсимвол, заглавную и строчную латинские буквы")
            else if(password !== password2) toast.info("Пароли не совпадают!")
            else if(phoneNumber.length != 11) toast.info("Некорректный номер телефона")
            else if (firstname.length < 3) toast.info("Некорректное имя")
            else if (secondname.length < 3) toast.info("Некорректная фамилия")
            else if(secretQuestion.length < 5) toast.info("Секретный вопрос слишком короткий")
            else if(secretQuestionAnswer.length == 0) toast.info("Нет ответа на секретный вопрос")
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
                Введите логин:
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Логин'
                    className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>

            <label className='text-xs text-gray-400'>
                Введите пароль:
                <div className="relative">
                    
                    <input
                       type={pasType} 
                       className="block w-full  text-black rounded-lg bg-blue-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700" 
                       placeholder="Пароль" 
                       value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                        

                       </input>
                    
                    <div>
                    
                    <button onMouseEnter={() => setPasType('text')} onMouseLeave = {() => setPasType('password')} className="absolute right-1 bottom-2 ">
                    <AiFillEye/>
                    </button>
                    
                    </div>
                   
                </div>
            </label>

            <label className='text-xs text-gray-400'>
            Введите пароль еще раз:

            <div className="relative">
                    
                    <input
                       type={pasType} 
                       className="block w-full  text-black rounded-lg bg-blue-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700" 
                       placeholder="Пароль повторно" 
                       value={password2}
                        onChange={(e) => setPassword2(e.target.value)}>
                        

                       </input>
                    
                    <div>
                    
                    <button onMouseEnter={() => setPasType('text')} onMouseLeave = {() => setPasType('password')} className="absolute right-1 bottom-2 ">
                    <AiFillEye/>
                    </button>
                    
                    </div>
                   
                </div>

               
                
                
            </label>

            <label className='text-xs text-gray-400'>
                Введите ваше имя:
                <input
                    type='text'
                    value={firstname}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Имя'
                    className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>
            <label className='text-xs text-gray-400'>
                Введите вашу фамилию:
                <input
                    type='text'
                    value={secondname}
                    onChange={(e) => setSecondName(e.target.value)}
                    placeholder='Фамилия'
                    className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>
            <label className='text-xs text-gray-400'>
                Введише ваш город:
                <input
                    type='text'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder='Город'
                    className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>
            <label className='text-xs text-gray-400'>
                Введите номер телефона:
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
