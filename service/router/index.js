const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    res.header("Content-Type", "text/html;charset=utf-8");
    next();
});
router.get('/recommend', (req, res) => {
    res.render('index');
});

router.get('/singer', (req, res) => {
    res.render('index');
});

router.get('/singer/:id', (req, res) => {
    res.render('index');
});

module.exports = router;
