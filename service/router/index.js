const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    res.header("Content-Type", "text/html;charset=utf-8");
    next();
});
router.get('/recommend', (req, res) => {
    res.render('index');
});

module.exports = router;
