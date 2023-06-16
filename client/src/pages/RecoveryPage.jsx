import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import axios from '../utils/axios'
import { AiFillEye } from 'react-icons/ai'

export const RecoveryPage = () => {
    const [usernameOrNumber, setUsername] = useState('')
    // const [firstname, setfirstname] = useState('')
    // const [secondname, setsecondname] = useState('')
    // const [phonenumber, setphonenumber] = useState('')
    const [secretQuestion, setSecretQuestion] = useState('')
    const [secretQuestionAnswer, setSecretQuestionAnswer] = useState('')

    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [next, setNext] = useState(false);
    const [changePas, setChangePas] = useState(false);
    const [pasType, setPasType] = useState('password')
    const [btnValue, setBtnValue] = useState('Продолжить');
    const [userId, setUserId] = useState('')
    const regexp = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/
    const {  status } = useSelector((state) => state.auth)
    console.log('status',status)
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    var goodAuth, badAuth = ''
    console.log('isAuth',isAuth)
    //var btn = false;


    



    const handleSubmit = async () => {
        try {
            // dispatch(loginUser({ username, password }))
            // setBtn('true');
            
            if(next == false){
                const { data } = await axios.post('/auth/recovery', {
              
                    usernameOrNumber,
                    
                })
    
                console.log(data);
                if(data.user != null){
                    setBtnValue('Восстановить')
                    setNext(true)
                    setSecretQuestion(data.user.secretQuestion)
                    setUserId(data.user._id)
                }
                else{
                    toast.info("Некорректные данные")
                }
            }
            if(next == true){

                if(changePas == false){
                    const { data } = await axios.post('/auth/validate-secret', {
              
                        userId,
                        secretQuestionAnswer
                        
                    })
    
                    console.log(data)
    
                    if(data){
                        setBtnValue('Изменить пароль')
                        setChangePas(true)
    
                    }
                    else(toast.info('Неверный ответ на секретный вопрос'))
                }
                
                else{

                    if(password !== password2) toast.info('Пароли не совпадают!')
                    else{

                        if(password.length<8) toast.info("Пароль слишком короткий")
                        else if(password.match(regexp) === null) toast.info("Некорректный пароль." + "\n Пароль должен содержать: хотя бы одно число, один спецсимвол, заглавную и строчную латинские буквы")
            
                        else{
                            const { data } = await axios.post('/auth/change-password', {

                                userId,
                                password
                                
                            })
                            console.log(data)
                            
                            navigate("/login")
                            toast.info(data.message)

                        }
                    }
                    

                }
                

            }
            
            
            
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

            <h3 className='mt-2 text-xs opacity-80 '>Введите логин или номер телефона</h3>
            <label className='text-xs text-gray-400'>
                <input
                    type='text'
                    value={usernameOrNumber}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Логин или номер телефона'
                    className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>

            {next && (
                <><div className='text-xs opacity-80 mt-3 font-bold'>
                    Секретный вопрос:
                    <span className='font-normal'>  {secretQuestion}</span>
                </div>

                <div className='text-xs my-2'>
                    Введите ответ на секретный вопрос
                        <input
                            type='text'
                            value={secretQuestionAnswer}
                            onChange={(e) => setSecretQuestionAnswer(e.target.value)}
                            placeholder='Ответ на вопрос'
                            className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700' />
                    </div></>

                    
            
            
            )}

            {changePas && (
                <>
             <div className="relative text-xs my-2">
                    Введите новый пароль
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
                

                <div className="relative text-xs my-2 ">
                Введите пароль еще раз:
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
               </>
            )}


            
           

            <div className='grid gap-4 mt-7 justify-center '>
                <div className='flex justify-center'>
                    <button
                    
                    type='submit'
                    onClick={handleSubmit}
                    className='min-w-[100px]  text-center font-bold  text-white rounded-lg px-4 py-2 text-xs  btn-color p-1 cursor-pointer hover:bg-blue-800'
                >
                    {btnValue}
                </button>
                </div>
                
                
                
            </div>
        </form>
    )
}
