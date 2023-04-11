import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../redux/features/post/postSlice'
import { CategoryItem } from '../components/CategoryItem.jsx'
import { createTask } from '../redux/features/task/taskSlice'

export const AddTaskPage = () => {
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [price, setPrice] = useState('')
    const [address, setAddress] = useState('')
    const [cat, setCat] = useState('')

    const sortOptions = [
        "Бытовые услуги",
       "Электроника",
        "Машины"
        // { name: "Price: Low to High", href: "#", current: false },
        // { name: "Price: High to Low", href: "#", current: false },
      ];
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = () => {
        try {
            const data = new FormData()
            data.append('title', title)
            data.append('date', date)
            data.append('address', address)
            data.append('category', cat)
            data.append('price', price)
            dispatch(createTask(data))
            navigate('/tasks')
            window.location.reload(false);
        } catch (error) {
            console.log(error)
        }
    }
    const clearFormHandler = () => {
        setDate('')
        setAddress('')
        setTitle('')
        setPrice('')
        setCat('')
    }
    const handle = () => {
        // element = document.getElementById(id);
        console.log('dada',this)
        window.location.reload(true);

    }

    const categoriesList = [
       
        {
            id: 1,
            value: 'Бытовые услуги'
        }, {
            id: 2,
            value: 'Электроника'
        }, {
            id: 3,
            value: 'Машины'
        }
        ];
        
        function Options({ options }) {
            return (
                options.map(option => 
                            <option key={option.id} value={option.value}>                                   
                            {option.value}
                            </option>)
                           );
        }

    
    //console.log('cat',cat)
    return (
        <>
        

        <form
            className='w-1/3 mx-auto py-10'
            onSubmit={(e) => e.preventDefault()}
        >
                
               

                <label className='text-xl text-black opacity-90'>
                    Как назвать задание?
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Название задания'
                        className='mt-1 text-black w-full rounded-lg bg-blue-400 border py-1 px-2 text-xl outline-none placeholder:text-gray-700' />
                </label>

                <label className='text-xl text-black opacity-90'>
                    Срок выполнения (например, 01.01.2023):
                    <input
                        type='text'
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                        placeholder='Срок выполнения'
                        className='mt-1 text-black w-full rounded-lg bg-blue-400 border py-1 px-2 text-xl outline-none placeholder:text-gray-700' />
                </label>

                <label className='text-xl text-black opacity-90'>
                    Адрес:
                    <input
                        type='text'
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        placeholder='Адрес'
                        className='mt-1 text-black w-full rounded-lg bg-blue-400 border py-1 px-2 text-xl outline-none placeholder:text-gray-700' />
                </label>

                <label className='text-xl text-black opacity-90'>
                    Стоимость задания в рублях:
                    <input
                        type='number'
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        placeholder='1000, 5000, 10000'
                        className='mt-1 text-black w-full rounded-lg bg-blue-400 border py-1 px-2 text-xl outline-none placeholder:text-gray-700' />
                </label>
                <label className='text-xl text-black opacity-90'>
                    Категория      
                </label>
                <input list="categories" id="catlist" 
                        onChange={(e) => setCat(e.target.value)} 
                        name="category" className='mt-1 text-black w-full rounded-lg bg-blue-400 border py-1 px-2 text-xl outline-none placeholder:text-gray-700 '>
                        </input>
                        <datalist id="categories">
                            <Options options={categoriesList} />
                        </datalist>

                
                
                <div className='flex gap-8 items-center justify-center mt-4'>
                    <button
                        onClick={submitHandler}
                        className='flex justify-center items-center bg-blue-600 text-m text-white rounded-lg py-2 px-4 hover:text-black'
                    >
                        Добавить
                    </button>

                    <button
                        onClick={clearFormHandler}
                        className='flex justify-center items-center bg-red-500 text-m text-white rounded-lg py-2 px-4 hover:text-black'
                    >
                        Отменить
                    </button>
                </div>
            </form></>
    )
}
