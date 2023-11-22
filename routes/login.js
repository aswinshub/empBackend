const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const empData = require("../model/empSchema");
require("../db/connect");


router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        let token = null;

        // Check if the user is in the database
        const foundUser = await empData.findOne({ email, password });

        if (foundUser) {
            // Database user found, use a different secret
            let payload = { email: email, password: password };
            token = jwt.sign(payload, 'reactempapp');
        } else if (email === 'admin' && password === 'admin') {
            // Check hardcoded admin credentials
            let payload = { email: email, password: password };
            token = jwt.sign(payload, 'reactempapp');
        } else {
            // No matching credentials
            return res.status(401).send('Invalid credentials');
        }

        res.status(200).send({ message: 'success', token: token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send(error);
    }
});

module.exports = router;

