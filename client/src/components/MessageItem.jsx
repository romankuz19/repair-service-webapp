import React from 'react'

export const MessageItem = ({ msg }) => {
    //const avatar = cmt.comment.trim().toUpperCase().split('').slice(0, 2)
    // var sendmsg=''
    // if(msg.senderId===userid1){
    //     sendmsg=msg.message
    // }
    return (
        
        <div className='flex flex-row gap-3 pt-2'>
            <div className='flex  text-sm'>
                {msg.senderName}:
            </div>
            
            <div className='flex text-white text-[12px]'>{msg.message}</div>
        </div>
    )
}
