var express = require('express');
var router = express.Router();

// const data = require('../models/texts');
// const texts = require('../models/texts');
const db = require('../db/database');
const auth = require('../models/auth');

router.get('/week/:kmom', function(req, res) {
    let sql = `SELECT week, text FROM reports WHERE week = ?;`;

    db.each(sql, req.params.kmom, function(err, row) {
        console.log(row.week + ": " + row.text);
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "GET /reports",
                    title: "Database error",
                    detail: err.message
                }
            });
        }
        const data = {
            data: {
                week: row.week,
                text: row.text
            }
        };

        // console.log(data);
        res.status(200).json(data);
    });
});

router.put("/",
    (req, res, next) => auth.checkToken(req, res, next),
    (req, res) => report(res, req.body, true));


router.post("/",
    (req, res, next) => auth.checkToken(req, res, next),
    (req, res) => report(res, req.body));

router.delete("/",
    (req, res, next) => auth.checkToken(req, res, next),
    (req, res) => reportDelete(res, req.body));


function report(res, body, edit = false) {
    const week = body.week;
    const text = body.text;

    let sql = "";

    if (edit) {
        sql = "UPDATE reports SET text = ? WHERE week = ?;";
    } else {
        sql = "INSERT INTO reports (text, week) VALUES(?, ?);";
    }

    db.run(sql, text, week,
        (err) => {
            if (err) {
                // console.log(err);
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "GET /reports",
                        title: "Database error",
                        detail: err.message
                    }
                });
            }

            return res.status(201).json({
                data: {
                    message: "Report successfully created / updated."
                }
            });
        });
}

function reportDelete(res, body) {
    const week = body.week;
    let sql = "DELETE FROM reports WHERE week = ?;";

    db.run(sql, week,
        (err) => {
            if (err) {
                // console.log(err);
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "GET /reports",
                        title: "Database error",
                        detail: err.message
                    }
                });
            }

            return res.status(201).json({
                data: {
                    message: "Report successfully deleted."
                }
            });
        });
}
module.exports = router;
