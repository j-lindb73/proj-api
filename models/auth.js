const db = require("../db/database.js");
// const hat = require("hat");
// const validator = require("email-validator");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let config;

try {
    config = require('../config.json');
} catch (error) {
    console.error(error);
}

const jwtSecret = process.env.JWT_SECRET || config.secret;

const auth = {
    register_old: function(res, body) {
        let sql = "INSERT INTO users (email, password) VALUES (?, ?);";

        db.run(sql, body.email, body.password, function(err) {
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

            res.status(201).json({
                data: {
                    msg: "Got a POST request, sending back 201 Created"
                }
            });
        });
    },
    register: function(res, body) {
        const email = body.email;
        const password = body.password;
        // const apiKey = body.api_key;

        if (!email || !password) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/register",
                    title: "Email or password missing",
                    detail: "Email or password missing in request"
                }
            });
        }

        bcrypt.hash(password, 10, function(err, hash) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/register",
                        title: "bcrypt error",
                        detail: "bcrypt error"
                    }
                });
            }

            db.run("INSERT INTO users (email, password) VALUES (?, ?)",
                email,
                hash, (err) => {
                    if (err) {
                        return res.status(500).json({
                            errors: {
                                status: 500,
                                source: "/register",
                                title: "Database error",
                                detail: err.message
                            }
                        });
                    }

                    return res.status(201).json({
                        data: {
                            message: "User successfully registered."
                        }
                    });
                });
        });
    },
    login: function(res, body) {
        const email = body.email;
        const password = body.password;
        //const apiKey = body.api_key;

        if (!email || !password) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/login",
                    title: "Email or password missing",
                    detail: "Email or password missing in request"
                }
            });
        }

        db.get("SELECT * FROM users WHERE email = ?",
            // apiKey,
            email,
            (err, rows) => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "/login",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }

                if (rows === undefined) {
                    return res.status(401).json({
                        errors: {
                            status: 401,
                            source: "/login",
                            title: "User not found",
                            detail: "User with provided email not found."
                        }
                    });
                }

                const user = rows;

                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            errors: {
                                status: 500,
                                source: "/login",
                                title: "bcrypt error",
                                detail: "bcrypt error"
                            }
                        });
                    }

                    if (result) {
                        let payload = { email: user.email };
                        let jwtToken = jwt.sign(payload, jwtSecret, { expiresIn: '24h' });

                        return res.status(200).json({
                            data: {
                                type: "success",
                                message: "User logged in",
                                user: payload,
                                token: jwtToken
                            }
                        });
                    }

                    return res.status(401).json({
                        errors: {
                            status: 401,
                            source: "/login",
                            title: "Wrong password",
                            detail: "Password is incorrect."
                        }
                    });
                });
            });
    },
    checkToken: function(req, res, next) {
        var token = req.headers['x-access-token'];

        // console.log("Här kommer token: ");
        // console.log(token);

        if (token) {
            jwt.verify(token, jwtSecret, function(err) {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: req.path,
                            title: "Failed authentication",
                            detail: err.message
                        }
                    });
                }

                // req.user = {};
                // req.user.api_key = decoded.api_key;
                // req.user.email = decoded.email;

                next();

                return undefined;
            });
        } else {
            // console.log("ingen token");
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: req.path,
                    title: "No token",
                    detail: "No token provided in request headers"
                }
            });
        }
    }

};



module.exports = auth;
