import React from 'react'

export const ChatItem = ({ messages}) => {
    //const avatar = cmt.comment.trim().toUpperCase().split('').slice(0, 2)
    // var sendmsg=''
    // if(msg.senderId===userid1){
    //     sendmsg=msg.message
    // }
    console.log('msg',messages)
    //console.log('name',senderName)
    return (
        
        <div className='flex flex-row gap-3 pt-2'>
            <div className='flex  text-sm'>
                {messages.senderName}:
            </div>
            
            <div className='flex text-white text-sm'> {messages.message}</div>
        </div>
    )
}
