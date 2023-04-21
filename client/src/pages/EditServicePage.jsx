import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updatePost } from '../redux/features/post/postSlice'

import axios from '../utils/axios'

export const EditServicePage = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [cat, setCat] = useState('')
    const [price, setPrice] = useState('')
    const [oldImage, setOldImage] = useState('')
    const [newImage, setNewImage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        //console.log('data',data)
        setTitle(data.post.title)
        setText(data.post.text)
        setCat(data.post.category)
        setPrice(data.post.price)
        setOldImage(data.post.imgUrl)
    }, [params.id])

    const submitHandler = () => {
        try {
            const updatedPost = new FormData()
            updatedPost.append('title', title)
            updatedPost.append('text', text)
            updatedPost.append('category', cat)
            updatedPost.append('price', price)
            updatedPost.append('id', params.id)
            updatedPost.append('image', newImage)
            console.log('upd',updatedPost)
            dispatch(updatePost(updatedPost))
            navigate('/')
            window.location.reload(false);
        } catch (error) {
            console.log(error)
        }
    }

    const clearFormHandler = () => {
        setTitle('')
        setText('')
        setPrice('')
        setCat('')
    }

    useEffect(() => {
        fetchPost()
    }, [fetchPost])
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
           <label className='hover:bg-blue-800  text-white py-2 btn-color rounded-lg text-m mt-2 flex items-center justify-center font-bold cursor-pointer'>
                    Прикрепите вашу фотографию:
                <input
                    type='file'
                    className='hidden'
                    onChange={(e) => {
                        setNewImage(e.target.files[0])
                        setOldImage('')
                    } } />
            </label>
            <div className='flex py-2 w-16 md:w-16 lg:w-32'>
                {oldImage && (
                    <img
                        src={`http://localhost:3002/${oldImage}`}
                        alt={oldImage.name} />
                )}
                {newImage && (
                    <img
                        src={URL.createObjectURL(newImage)}
                        alt={newImage.name} />
                )}
            </div>
            <label className='text-xl text-black opacity-90'>
                    Расскажите о себе:
                    <input
                        type='text'
                        value={title}
                         onChange={(e) => setTitle(e.target.value)}
                        placeholder='Кто вы и чем занимаетесь'
                        className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xl outline-none placeholder:text-gray-700' />
                </label>
                <label className='text-xl text-black opacity-90'>
                    Предлагаемая услуга:
                    <textarea
                         onChange={(e) => setText(e.target.value)}
                         value={text}
                        placeholder='Починка телефона, стиральной машинки и т.д.'
                        className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xl outline-none resize-none h-20 placeholder:text-gray-700' />
                </label>
                <label className='text-xl text-black opacity-90'>
                    Стоимость услуги в рублях:
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
                        name="category" className='mt-1 text-black w-full rounded-lg bg-blue-100 border py-1 px-2 text-xl outline-none placeholder:text-gray-700 '>
                        </input>
                        <datalist id="categories">
                            <Options options={categoriesList} />
                        </datalist>



            <div className='flex gap-8 items-center justify-center mt-4'>
                <button
                    onClick={submitHandler}
                    className='flex font-bold justify-center items-center hover:bg-blue-800 btn-color text-m text-white rounded-lg py-2 px-4 '
                >
                    Обновить
                </button>

                <button
                    onClick={fetchPost}
                    className='flex font-bold justify-center items-center bg-red-500 text-m text-white rounded-lg py-2 px-4 hover:text-black'
                >
                    Отменить
                </button>

            </div>
        </form></>
        
    )
}
