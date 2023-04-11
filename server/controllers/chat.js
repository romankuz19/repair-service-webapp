import ChatMessage from '../models/ChatMessage.js'
import Chat from '../models/Chat.js'
import User from '../models/User.js'


export const createChat = async (req, res) => {
    try {
        //const firstUserId = await User.findById(req.userId)
        const { firstUserId, secondUserId } = req.body

        //console.log('first',firstUserId)
        //console.log('second',secondUserId)
        const checkChat = await Chat.findOne().where('firstUserId').equals(firstUserId).where('secondUserId').equals(secondUserId)
        const checkChat2 = await Chat.findOne().where('firstUserId').equals(secondUserId).where('secondUserId').equals(firstUserId)
        //console.log('check',checkChat,checkChat2)
        if (checkChat){
            //console.log('if !=0',checkChat.length)

            res.json(checkChat)
            //return res.json({ message: 'Такой чат уже существует' })
        }
        else if(checkChat2){
            res.json(checkChat2)
        }

        else 
        {
        const newChat = new Chat({ firstUserId,secondUserId })
        await newChat.save()
        //console.log('if == 0',checkChat.length)
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
        //console.log('users',users)
        var filteredChats = userChats.filter(function (el) {
            return el != null;
          });
          var filteredUsers = users.filter(function (el) {
            return el != null;
          });
        //console.log(userChats)
       //console.log('filteredUsers',filteredUsers)
        res.json({filteredChats, filteredUsers})
    
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
