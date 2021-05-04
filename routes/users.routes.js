const express = require('express');
// const Connection = require('../models/Connection.js');
const db = require('../models/index.js');
const { Router } = express;
const router = Router()
// const User = require('../models/user.js')

router.get('/users/calculate/:projectId', async (req, res) => {
    try {
        let users, count;
        let reqDate = new Date().getTime();
        await db.sequelize.query('Select COUNT(*) from "Users" where (date_last_activity-date_registration)>7 and project=' + req.params.projectId).then(([results, metadata]) => {
            console.log(results)
            // console.log(metadata)
            users = results
        })
        await db.sequelize.query('Select COUNT(*) from "Users" where project=' + req.params.projectId).then(([results, metadata]) => {
            console.log(results)
            count = results
        })
        let resDate = new Date().getTime();
        let reqTime = resDate - reqDate;
        console.log(reqTime)
        let calculate = new Date().getTime();
        let RR7 = (users[0].count * 100) / count[0].count
        let calculateStop = new Date().getTime()
        let calculateTime = await (calculate - calculateStop)
        console.log(calculateTime)
        console.log(RR7)
        let responseStart = new Date().getTime();
        res.json({ RR7, reqTime, calculateTime, responseStart })
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
            let user =await db.User.create(postData)
            users.push(user)
        });
        console.log('ssssssssss')
        res.json({ users })
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
        console.log(e)
    }
})

module.exports = router