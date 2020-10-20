
var express = require('express');
var router = express.Router();

const db = require('../db/database');
const stock = require('../models/stock');
const user = require('../models/user');


// Testing routes with method
router.get("/", (req, res) => {
    res.json({
        data: {
            msg: "Got a GET request, sending back default 200"
        }
    });
});

router.get("/:email", (req, res) => {
    // console.log(res);
    let balance = user.getBalance(req.params.email);

    res.status(200).json(balance);
});

router.post("/", (req, res) => {
    // auth.register(res, req.body);
    stock.getStocks(res, req.body);
});


router.post("/buy",
    (req, res, next) => user.checkBalance(res, req.body, next),
    (req, res, next) => user.withdraw(res, req.body, next),
    (req, res) => stock.buyStock(res, req.body)

);

router.post("/sell",
    // (req, res, next) => user.checkBalance(res, req.body, next),
    (req, res, next) => user.deposit(res, req.body, next),
    (req, res) => stock.sellStock(res, req.body)

);

router.post("/withdraw", (req, res) => {
    // auth.register(res, req.body);
    user.withdraw(res, req.body);
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
