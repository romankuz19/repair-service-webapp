import User from '../models/User.js'

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const list = (
            user._id,
            user.username 
            )
        
        if (!user) {
            return res.json({
                message: 'Такого юзера не существует.',
            })
        }
        // res.json({
        //     user,
        // })
             res.json({user})
    } catch (error) {
        res.json({ message: 'Нет доступа 3.' })
    }
}