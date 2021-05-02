import express from 'express';
import Connection from '../models/Connection.js';
const { Router } = express;
const router = Router()
import User from '../models/User.js'

router.post('/users/register', async (req, res) => {
    try {
        let users = [];
        req.body.users.forEach(async (item) => {
            let postData = {
                userId: item.userId,
                date_registration: item.date_registration,
                date_last_activity: item.date_last_activity,
            }
            let user = await User.create(postData)
            users.push(user)
        });
        console.log('ssssssssss')
        res.json({ users })
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
        console.log(e)
    }
})
router.put('/users/:id', async (req, res) => {
    try {
        let user = await User.update({ date_last_activity: req.body.date_last_activity }, {
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