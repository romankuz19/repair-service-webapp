import ChatMessage from '../models/ChatMessage.js'
import Chat from '../models/Chat.js'
import User from '../models/User.js'


export const createChat = async (req, res) => {
    try {
        //const firstUserId = await User.findById(req.userId)
        const { firstUserId, secondUserId } = req.body

        const checkChat = await Chat.find().where('firstUserId').equals(firstUserId).where('secondUserId').equals(secondUserId)
        if (checkChat.length!=0){
            console.log('if !=0',checkChat.length)
            res.json(checkChat)
            //return res.json({ message: 'Такой чат уже существует' })
        }

        else 
        {
        const newChat = new Chat({ firstUserId,secondUserId })
        await newChat.save()
        console.log('if == 0',checkChat.length)
        //console.log(firstUserId)
        //console.log(secondUserId)
        res.json(newChat)
        }
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}


export const getChats = async (req, res) => {
    try {
       // console.log('entered')
       // console.log(req.userId)
        const userId = req.userId
        
        //const { firstUserId, secondUserId } = req.params
        //console.log(req.userId)
        const allChats = await Chat.find()
        //console.log('all chats',allChats)
        //const sendChat=checkChat[0]
        var userChats=[]
        var users=[]
        for (var i = 0; i < allChats.length; i++) {
            if(allChats[i].firstUserId===userId || allChats[i].secondUserId===userId){
                userChats[i]=allChats[i]
                if(allChats[i].firstUserId===userId){
                    var temp = allChats[i].secondUserId
                    //console.log('users',temp)
                    var some = await User.findById(temp)
                    //console.log('users',some)
                    users[i]= some

                }
                else if(allChats[i].secondUserId===userId){
                    var temp = allChats[i].firstUserId
                    //console.log('users',temp)
                    var some = await User.findById(temp)
                    //console.log('users',some)
                    users[i]= some
                }
                
            }
        }
        console.log('users',users)
        var filtered = userChats.filter(function (el) {
            return el != null;
          });
        //console.log(userChats)
        //console.log('messages',filtered.messages)
        res.json({filtered, users})
    
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

// export const getChatMessages = async (req, res) => {
//     try {
//         const {firstUserId,secondUserId}= req.body
//         const chat = await Chat.find().where('firstUserId').equals(firstUserId).where('secondUserId').equals(secondUserId)
//         const list = await Promise.all(
//             chat.messages.map((message) => {
//                 return ChatMessage.findById(message)
//             }),
//         )
//         res.json(list)
//     } catch (error) {
//         res.json({ message: 'Что-то пошло не так.' })
//     }
// }
