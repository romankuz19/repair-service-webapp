import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateTask } from '../redux/features/task/taskSlice'

import axios from '../utils/axios'
import { toast } from 'react-toastify'

export const EditTaskPage = () => {
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [price, setPrice] = useState('')
    const [address, setAddress] = useState('')
    const [cat, setCat] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const fetchTask = useCallback(async () => {
        const { data } = await axios.get(`/tasks/${params.id}`)
        console.log('data',data.task)
        setTitle(data.task.title)
        setDescription(data.task.description)
        setDate(data.task.date)
        setCat(data.task.category)
        setPrice(data.task.price)
        setAddress(data.task.address)
        
    }, [params.id])

    const submitHandler = () => {
        try {
            const updatedTask = new FormData()
            updatedTask.append('title', title)
            updatedTask.append('description', description)
            updatedTask.append('category', cat)
            updatedTask.append('price', price)
            updatedTask.append('id', params.id)
            updatedTask.append('date', date)
            updatedTask.append('address', address)
            // console.log('cat',cat)
            // console.log('upd',updatedTask)
            dispatch(updateTask(updatedTask))
            navigate(`/tasks/${params.id}`)
            toast.info("Заказ был обновлен")
            window.location.reload(false);
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchTask()
    }, [fetchTask])
    const categoriesList = [
       
        {
            id: 1,
            value: 'Бытовые услуги'
        } , {
            id: 2,
            value: 'Цифровая техника'
        }, {
            id: 3,
            value: 'Транспорт'
        },
        {
            id: 4,
            value: 'Ремонт и строительство'
        },
       
        
        ];
        
        function Options({ options }) {
            return (
                options.map(option => 
                            <option key={option.id} value={option.value}>                                   
                            {option.value}
                            </option>)
                           );
        }

    //console.log('title',title)
    return (
        
        <><form
            className='w-1/3 mx-auto py-10'
            onSubmit={(e) => e.preventDefault()}
        >
          
            
          <label className='text-xl text-black opacity-90'>
                    Как назвать заказ?
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Название заказа'
                        className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xl outline-none placeholder:text-gray-700' />
                </label>

                <label className='text-xl text-black opacity-90'>
                    Опишите подробности заказа
                    <input
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Описание заказа'
                        className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xl outline-none placeholder:text-gray-700' />
                </label>

                <label className='text-xl text-black opacity-90'>
                    Срок выполнения (например, 01.01.2023):
                    <input
                        type='text'
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                        placeholder='Срок выполнения'
                        className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xl outline-none placeholder:text-gray-700' />
                </label>

                <label className='text-xl text-black opacity-90'>
                    Адрес:
                    <input
                        type='text'
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        placeholder='Адрес'
                        className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xl outline-none placeholder:text-gray-700' />
                </label>

                <label className='text-xl text-black opacity-90'>
                    Стоимость задания в рублях:
                    <input
                        type='number'
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        placeholder='1000, 5000, 10000'
                        className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xl outline-none placeholder:text-gray-700' />
                </label>
                <label className='text-xl text-black opacity-90'>
                    Категория      
                </label>
                <input list="categories" id="catlist" 
                        onChange={(e) => setCat(e.target.value)} 
                        value={cat}
                        name="category" className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xl outline-none placeholder:text-gray-700 '>
                        </input>
                        <datalist id="categories">
                            <Options options={categoriesList} />
                        </datalist>



            <div className='flex gap-8 items-center justify-center mt-4'>
                <button
                    onClick={submitHandler}
                    className='flex font-bold btn-color justify-center items-center hover:bg-blue-800 text-m text-white rounded-lg py-2 px-4 '
                >
                    Обновить
                </button>

                <button
                    onClick={fetchTask}
                    className='flex font-bold justify-center items-center bg-red-500 text-m text-white rounded-lg py-2 px-4 hover:text-black'
                >
                    Отменить
                </button>

            </div>
        </form></>
        
    )
}
