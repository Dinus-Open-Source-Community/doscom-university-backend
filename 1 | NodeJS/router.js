const express = require('express');
const app = express();
const router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Time', Date.now());
    next();
});

router.get('/', (req, res) => {
    res.send('Home Page');
});

router.get('/about', (req, res) => {
    res.send('About Page');
});

module.exports = router
