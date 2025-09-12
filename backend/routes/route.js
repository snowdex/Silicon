const express = require('express');
const router = express.Router();
const { login, signup } = require('../auth/auth.js');
const validateToken = require('../auth/validateToken.js');
const { getAllChores, createChore } = require('../ops/chores.js');

router.get('/v1/', validateToken,(req, res) => {
    res.send('Home Page');
});
router.get('/v1/dashboard', (req, res) => {
    res.send('Dashboard Page');
});
router.get('/v1/school', (req, res) => {
    res.send('School Page');
});

//Validation token for frontend user access
router.get('/v1/me', validateToken, (req, res)=>{
    try {
        const { id,email, name} = req.user; // Extracted from validateToken middleware
        return res.status(200).json({ id, email, name });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
})


//chores
router.get('/v1/chores', getAllChores)
router.post('/v1/chores/add', createChore)

router.post('/v1/school/attendance', (req, res) => {
    res.send('School Attendance Page');
});



router.post('/v1/login', login);
router.post('/v1/signup', signup);

module.exports = router;