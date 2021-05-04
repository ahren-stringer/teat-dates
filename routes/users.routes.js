import express from 'express';
import Connection from '../models/Connection.js';
const { Router } = express;
const router = Router()
import User from '../models/User.js'

router.get('/single_user/:id', async (req, res) => {
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
router.get('/users/calculate/:projectId', async (req, res) => {
    try {
        let users, count;
        let reqDate=new Date().getTime();
        await Connection.query('Select COUNT(*) from users where (date_last_activity-date_registration)>7 and project='+req.params.projectId).then(([results, metadata]) => {
            console.log(results)
            // console.log(metadata)
            users=results
        })
        await Connection.query('Select COUNT(*) from users where project='+req.params.projectId).then(([results, metadata]) => {
            console.log(results)
            count=results
        })
        let resDate=new Date().getTime();
        let reqTime=resDate-reqDate;
        console.log(reqTime)
        let calculate=new Date().getTime();
        let RR7=(users[0].count*100)/count[0].count
        let calculateStop=new Date().getTime()
        let calculateTime=await(calculate-calculateStop)
        console.log(calculateTime)
        console.log(RR7)
        let responseStart=new Date().getTime();
        res.json({RR7,reqTime,calculateTime,responseStart})
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Пользователь' })
    }
})
router.post('/users/register', async (req, res) => {
    try {
        let users = [];
        req.body.users.forEach(async (item) => {
            let postData = {
                userId: item.userId,
                date_registration: item.date_registration,
                date_last_activity: item.date_last_activity,
                project: item.project
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