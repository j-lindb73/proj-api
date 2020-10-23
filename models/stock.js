const db = require('../db/database');


const stock = {
    buyStock: function(res, body) {
        const email = body.email;
        const stockname = body.stockname;
        const amount = body.amount;
        const price = body.price;
        // const password = body.password;
        // const apiKey = body.api_key;

        if (!email || !stockname || !amount || !price) {
            this.missingValue(res);
            return;
        }


        db.run("INSERT INTO users_stocks (email, stockname, amount, price) VALUES (?, ?, ? ,?)",
            email,
            stockname,
            amount,
            price, (err) => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "/stock/buy",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }

                return res.status(201).json({
                    data: {
                        message: "Stock purchased."
                    }
                });
            });
    },
    // getStocks: function(res, body, next) {  next användes aldrig.Kanske behöver gå tillbaka...
    getStocks: function(res, body) {
        const email = body.email;

        if (!email) {
            this.missingValue(res);
            return;
        }

        let sql = `SELECT rowid,stockname,amount,price,timestamp FROM users_stocks WHERE email=?;`;

        db.all(sql,
            email, function(err, row) {
                console.log(row);
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "GET /stocks",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }
                const data = {
                    data: row
                };

                res.status(200).json(data);
            });
    },
    sellStock: function(res, body) {
        const email = body.email;
        const userStockRowid = body.userStockRowid;
        // const amount = body.amount;
        // const price = body.price;
        // const password = body.password;
        // const apiKey = body.api_key;

        if (!email || !userStockRowid) {
            this.missingValue(res);
            return;
        }


        db.run("DELETE FROM users_stocks WHERE email = ? AND rowid = ?",
            email,
            userStockRowid, (err) => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "/stock/sell",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }

                return res.status(201).json({
                    data: {
                        message: "Stock sold."
                    }
                });
            });
    },
    randomAroundZero: function () {
        return Math.random() > 0.5 ? 1 : -1;
    },

    getStockPrice: function (input) {
        let start = input.startingPoint;
        let rate = input.rate;
        let variance = input.variance;

        return start * rate + variance * stock.randomAroundZero();
    },
    missingValue: function(res) {
        return res.status(401).json({
            errors: {
                status: 401,
                source: "/user",
                title: "Value is missing",
                detail: "Value is missing in request"
            }
        });
    },
    getNow: function() {
        const d = new Date();
        const timestampISO = d.toISOString();
        return timestampISO;
    }

};

module.exports = stock;
