import React from 'react'
import chatIcon from '../images/chat-icon.png';
import axios from '../utils/axios'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import swal from 'sweetalert';

export const SupportChat = ({ userId }) => {
    //const avatar = cmt.comment.trim().toUpperCase().split('').slice(0, 2)
    // var sendmsg=''
    // if(msg.senderId===userid1){
    //     sendmsg=msg.message
    // }
    const navigate = useNavigate()


    const handleSupportChat = async () => {

        console.log("userId",userId)

        if(!userId){
            // toast.info('Сперва войдите в аккаунт')
            // navigate("/login")
            swal({
                title: "Войдите в аккаунт или напишите нам на почту uslugi-agregator@mail.ru",
                // text: "Или войдите в аккаунт",
                icon: "info",
                buttons: ["Закрыть", "Войти"],
              })
              .then((e) => {
                if (e) {
                  navigate('/login')
                } 
              });

        }
        else{
            const { data }  = await axios.get('/auth/admin-id')
            console.log(data)
            var adminId = data._id
    
            await axios.post(`/chat/create`, {
                firstUserId: userId,
                secondUserId: adminId,
            })
            navigate(`/chats/?id=${adminId}`)
        }


    }
    return (
        
        <div className='fixed bottom-10 right-10 text-xs text-cat-color font-bold items-center flex flex-col gap-2 justify-center cursor-pointer'
            onClick={handleSupportChat}>
            <div className='flex items-center '>
                <img className='w-10 h-10' src={chatIcon} alt="" />
                {}
            </div>
            <div>
                Есть вопросы? <br /> Напишите нам!
                </div>
            </div>
    )
}
