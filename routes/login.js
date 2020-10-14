
var express = require('express');
var router = express.Router();

// const db = require('../db/database');
const auth = require('../models/auth');


// Testing routes with method
router.get("/", (req, res) => {
    res.json({
        data: {
            msg: "Got a GET request, sending back default 200"
        }
    });
});

router.post("/", (req, res) => {
    auth.login(res, req.body);
});


module.exports = router;
