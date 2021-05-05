const express = require('express');
const pool = require('../models/connection');
// const Connection = require('../models/Connection.js');
// const db = require('../models/index.js');
const { Router } = express;
const router = Router()
// const User = require('../models/user.js')

router.get('/users/calculate/:projectId', async (req, res) => {
    try {
        let users, count;
        let reqDate = new Date().getTime();
        let r1 = await pool.query('Select COUNT(*) from "users" where (date_last_activity-date_registration)>7 and project=' + req.params.projectId,
            (error, results) => {
                console.log(results.rows[0].count)

                users = results.rows[0].count
                pool.query('Select COUNT(*) from "users" where project=' + req.params.projectId,
                    (error, results) => {
                        console.log(results.rows[0].count)
                        count = results.rows[0].count

                        let resDate = new Date().getTime();
                        let reqTime = resDate - reqDate;
                        console.log(reqTime)
                        let calculate = new Date().getTime();
                        let RR7 = (users * 100) / count
                        let calculateStop = new Date().getTime()
                        let calculateTime = calculate - calculateStop
                        console.log(calculateTime)
                        console.log(RR7)
                        let responseStart = new Date().getTime();
                        res.json({ RR7, reqTime, calculateTime, responseStart })
                    })
            })

        // await pool.query('Select COUNT(*) from "users" where project=' + req.params.projectId,
        //     (error, results) => {
        //         console.log(results.rows[0].count)
        //         count = results.rows[0].count
        //     })
        // let resDate = new Date().getTime();
        // let reqTime = resDate - reqDate;
        // console.log(reqTime)
        // let calculate = new Date().getTime();
        // let RR7 = (users * 100) / count
        // let calculateStop = new Date().getTime()
        // let calculateTime = await (calculate - calculateStop)
        // console.log(calculateTime)
        // console.log(RR7)
        // let responseStart = new Date().getTime();
        // res.json({ RR7, reqTime, calculateTime, responseStart })
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
            let { userId, date_registration, date_last_activity, project } = item;
            let user = await pool.query('INSERT INTO users (userId, project, date_registration, date_last_activity) VALUES ($1, $2, $3,$4)', [userId, project, date_registration, date_last_activity])
            users.push(user)
        });
        res.json({ users })
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
        console.log(e)
    }
})

module.exports = router