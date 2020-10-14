
var express = require('express');
var router = express.Router();

const db = require('../db/database');
const auth = require('../models/auth');
// const bcrypt = require('bcryptjs');


// Testing routes with method
router.get("/", (req, res) => {
    res.json({
        data: {
            msg: "Got a GET request, sending back default 200"
        }
    });
});

router.post("/", (req, res) => {
    auth.register(res, req.body);
});



router.delete("/", (req, res) => {
    let sql = "DELETE FROM users WHERE email = ?;";

    db.run(sql, req.body.email, function(err) {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "POST /user",
                    title: "Database error",
                    detail: err.message
                }
            });
        }
        // DELETE requests should return 204 No Content
        res.status(204).send();
    });
});

module.exports = router;
