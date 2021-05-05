const express = require('express');
const pool = require('../models/connection.js');
// import Connection from '../models/Connection.js';
const { Router } = express;
const router = Router()

router.post('/project', async (req, res) => {
    try {
        console.log(pool)
        let project= await pool.query('INSERT INTO projects (name) VALUES ($1) RETURNING *', [req.body.name])
        res.json(project)
    } catch (e) {
        res.status(500).json(e)
        console.log(e)
    }
})

module.exports = router