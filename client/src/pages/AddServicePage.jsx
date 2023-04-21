import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../redux/features/post/postSlice'
import { CategoryItem } from '../components/CategoryItem.jsx'

export const AddServicePage = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
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
            data.append('text', text)
            data.append('category', cat)
            data.append('price', price)
            data.append('image', image)
            dispatch(createPost(data))
            navigate('/my-services')
            window.location.reload(false);
        } catch (error) {
            console.log(error)
        }
    }
    const clearFormHandler = () => {
        setText('')
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
                <label className='hover:bg-blue-800 font-bold text-white py-2 btn-color rounded-lg text-m mt-2 flex items-center justify-center border-2 cursor-pointer'>
                    Прикрепите вашу фотографию:
                    <input
                        type='file'
                        className='hidden'
                        onChange={(e) => setImage(e.target.files[0])} />
                </label>
                <div className='flex items-center justify-center object-cover py-2 w-16 md:w-16 lg:w-32'>
                    <div>
                        {image && (
                            <img src={URL.createObjectURL(image)} alt={image.name} />
                        )}
                    </div>

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
                {/* <div className=" w-full mx-auto relative lg:max-w-sm">
        
    <select  className="w-full p-2.5 text-gray-500 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:border-indigo-600">
        <option>Выберите категорию услуги</option>
        {sortOptions?.map((categories,idx) => (
         <CategoryItem key={idx} categories={categories} onClick={''} />
        ))}
        
    </select>
</div> */}


                <div className='flex gap-8 items-center justify-center mt-4'>
                    <button
                        onClick={submitHandler}
                        className='flex justify-center font-bold items-center btn-color text-m text-white rounded-lg py-2 px-4 hover:bg-blue-800'
                    >
                        Добавить
                    </button>

                    <button
                        onClick={clearFormHandler}
                        className='flex justify-center font-bold items-center bg-red-500 text-m text-white rounded-lg py-2 px-4 hover:text-black'
                    >
                        Отменить
                    </button>
                </div>
            </form></>
    )
}
