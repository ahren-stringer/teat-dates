import express from 'express';
const { Router } = express;
const router = Router()
import User from '../models/User.js'

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user)
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (e) {
        res.status(500).json({ message: 'Пользовательи не найдены' })
    }
})
// router.get('/users/me', async (req, res) => {
//     try {
//         const id: string = req.user && req.user._id;
//     UserModel.findById(id, (err: any, user: IUser) => {
//       if (err || !user) {
//         return res.status(404).json({
//           message: "User not found",
//         });
//       }
//       res.json(user);
//     });
//     } catch (e) {
//         res.status(500).json({ message: 'Пользователь не найден' })
//     }
// })
router.post('/users/register', async(req, res) => {
    try {
        const postData = {
            name: req.body.name,
            date_registration: req.body.date_registration,
            date_last_activity: req.body.date_registration,
        }
        let user= await User.create(postData);
        res.json(user)
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
        console.log(e)
    }
})
router.put('/users/:id', async(req, res) => {
    try {
        let user= await User.update({  date_last_activity: req.body.date_last_activity }, {
              where: {
                id: req.params.id
              }
            });
        res.json(user)
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
        console.log(e)
    }
})

export default router