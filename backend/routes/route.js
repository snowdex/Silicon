const express = require('express');
const router = express.Router();
const { login, signup } = require('../auth/auth.js');
const validateToken = require('../auth/validateToken.js');

router.get('/v1/', validateToken,(req, res) => {
    res.send('Home Page');
});
router.get('/v1/dashboard', (req, res) => {
    res.send('Dashboard Page');
});
router.get('/v1/school', (req, res) => {
    res.send('School Page');
});
router.post('/v1/school/attendance', (req, res) => {
    res.send('School Attendance Page');
});


router.post('/v1/login', login);
router.post('/v1/signup', signup);

module.exports = router;