const express = require('express');
const db = require('../models/index.js');
// import Connection from '../models/Connection.js';
const { Router } = express;
const router = Router()

router.post('/project', async (req, res) => {
    try {
        let project= await db.Project.create({name: req.body.name})
        res.json(project)
    } catch (e) {
        res.status(500).json(e)
        console.log(e)
    }
})

module.exports = router