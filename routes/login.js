const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const addpostData = require("../model/empSchema");
require("../db/connect");


// POST Method----------

router.post('/', async (req, res) => {
    try {
        const { name, password } = req.body;

        const foundUser = await addpostData.findOne({ name, password });

        if (foundUser) {
            res.status(200).send('Login successful');
        } else {
            res.status(200).send('Invalid credentials');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send(error);
    }
});

module.exports = router;
