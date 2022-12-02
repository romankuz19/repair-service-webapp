import React from 'react'

export const MessageItemRight = ({ msg, username2, userid2 }) => {
    //const avatar = cmt.comment.trim().toUpperCase().split('').slice(0, 2)
    var sendmsg=''
    if(msg.senderId===userid2){
        sendmsg=msg.message
    }
    return (
        
        <div className='flex flex-row gap-3 pt-2'>
            <div className='flex  text-sm'>
                {username2}
            </div>
            
            <div className='flex text-white text-[12px]'>{sendmsg}</div>
        </div>
    )
}
