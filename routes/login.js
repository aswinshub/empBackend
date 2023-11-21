const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const empData = require("../model/empSchema");
require("../db/connect");


// POST Method----------

// router.post('/', async (req, res) => {
//     try {
//         const { name, password } = req.body;

//         const foundUser = await empData.findOne({ name, password });

//         if (foundUser || (email === 'admin' && password === 'admin')) {
//             res.status(200).send('Login successful');
//         } else {
//             res.status(200).send('Invalid credentials');
//         }
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).send(error);
//     }
// });

router.post('/', async (req, res) => {
    try {
        const { name, password } = req.body;

        // Check if the user is in the database
        const foundUser = await empData.findOne({ name, password });

        if (foundUser || (name === 'admin' && password === 'admin')) {
            // Database user found or admin credentials matched
            res.status(200).send({ message: 'success' });
        } else {
            // No matching credentials
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send(error);
    }
});

module.exports = router;

