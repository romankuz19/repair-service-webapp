import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import axios from '../utils/axios'

export const RecoveryPage = () => {
    const [usernameOrNumber, setUsername] = useState('')
    // const [firstname, setfirstname] = useState('')
    // const [secondname, setsecondname] = useState('')
    // const [phonenumber, setphonenumber] = useState('')

    const [password, setPassword] = useState('')
    const [btn, setBtn] = useState(false);
    const [btnValue, setBtnValue] = useState('Восстановить');

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
              
                usernameOrNumber,
                
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
