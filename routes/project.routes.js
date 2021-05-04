import express from 'express';
// import Connection from '../models/Connection.js';
import Project from '../models/Project.js';
const { Router } = express;
const router = Router()
import User from '../models/User.js'

router.post('/project', async (req, res) => {
    try {
        let project= await Project.create({name: req.body.name})
        res.json(project)
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