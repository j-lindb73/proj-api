const db = require('../db/database');


const user = {
    getBalance: function(res, body) {
        const email = body.email;


        if (!email) {
            this.missingValue(res);
            return;
        }

        db.get("SELECT * FROM users WHERE email = ?",
        // apiKey,
            email,
            (err, rows) => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "/user",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }

                if (rows === undefined) {
                    return res.status(401).json({
                        errors: {
                            status: 401,
                            source: "/user",
                            title: "User not found",
                            detail: "User with provided email not found."
                        }
                    });
                }
                const user = rows;

                console.log(user);

                return res.status(200).json({
                    data: {
                        type: "success",
                        message: "User balance",
                        user: user.email,
                        balance: user.money
                    }
                });
            });
    },
    checkBalance: function(res, body, next=null) {
        const email = body.email;

        if (!email) {
            this.missingValue(res);
            return;
        }

        const totalPrice = body.amount*body.price;



        db.get("SELECT * FROM users WHERE email = ?",
            // apiKey,
            email,
            (err, rows) => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "/user",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }

                if (rows === undefined) {
                    return res.status(401).json({
                        errors: {
                            status: 401,
                            source: "/user",
                            title: "User not found",
                            detail: "User with provided email not found."
                        }
                    });
                }
                const user = rows;

                // console.log("In check balance!!!");
                // console.log(user);
                // console.log(body);
                if (user.money < totalPrice) {
                    return res.status(401).json({
                        errors: {
                            status: 401,
                            source: "/user",
                            title: "No funds",
                            detail: "User have no funds to proceed with purchase."
                        }
                    });
                }


                if (typeof next === 'function') {
                    next();
                } else {
                    return res.status(200).json({
                        data: {
                            type: "success",
                            message: "User balance",
                            user: user.email,
                            balance: user.money
                        }
                    });
                }
            });
    },
    deposit: function(res, body, next=null) {
        // console.log("IN DEPOSIT");
        const email = body.email;

        const totalPrice = body.amount*body.price;

        const deposit = totalPrice ? totalPrice : body.money;

        if (!email || !deposit) {
            this.missingValue(res);
            return;
        }

        db.run("UPDATE users SET money = money + ? WHERE email = ?",
            deposit,
            email, (err) => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "/user/deposit",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }
                if (typeof next === 'function') {
                    next();
                } else {
                    return res.status(201).json({
                        data: {
                            message: "Money deposited."
                        }
                    });
                }
            });
    },
    withdraw: function(res, body, next=null) {
        const email = body.email;
        // const money = body.money;
        const totalPrice = body.amount*body.price;

        const withdraw = totalPrice ? totalPrice : body.money;

        console.log("IN WITHDRAW");
        console.log(body);

        if (!email || !withdraw) {
            this.missingValue(res);
            return;
        }

        db.run("UPDATE users SET money = money - ? WHERE email = ?",
            withdraw,
            email, (err) => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "/user/withdraw",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }
                console.log("Här är next!!");
                console.log(typeof next);
                if (typeof next === 'function') {
                    next();
                } else {
                    return res.status(201).json({
                        data: {
                            message: "Money withdrawn."
                        }
                    });
                }
            });
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
    }
};

module.exports = user;
