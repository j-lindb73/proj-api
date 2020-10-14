/* eslint-env mocha */

process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
// const db = require("../db/database.js");
// const { before } = require('mocha');


let token = "";

chai.should();

chai.use(chaiHttp);

describe('Testing of ME-API', () => {
    // before(() => {
    //     return new Promise((resolve) => {

    //     })
    // });
    describe('GET /', () => {
        it('200 HAPPY PATH getting base', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });
        it('GET register', (done) => {
            chai.request(server)
                .get("/register")
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });
        it('GET login', (done) => {
            chai.request(server)
                .get("/login")
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });
        it('GET invalid route', (done) => {
            chai.request(server)
                .get("/invalid")
                .end((err, res) => {
                    res.should.have.status(404);

                    done();
                });
        });
    });
    describe('POST', () => {
        it('POST register new user should work', (done) => {
            let user= {
                email: "test@test.se",
                password: "test123"
            };

            chai.request(server)
                .post("/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });

        it('POST register new user shold not work (no email)', (done) => {
            let user= {
                // email: "test@test.se",
                password: "test123"
            };

            chai.request(server)
                .post("/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });

        it('POST login user should work', (done) => {
            let user= {
                email: "test@test.se",
                password: "test123"
            };


            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    token = res.body.data.token;
                    // console.log(token);
                    done();
                });
        });
        it('POST register report should work (token)', (done) => {
            chai.request(server)
                .post("/reports")
                .set('Content-Type', 'application/json')
                .set('x-access-token', token)
                .send(JSON.stringify({
                    week: 1,
                    text: "Report 1"
                }))
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
    });

    describe('PUT', () => {
        it('PUT edit report should work (token)', (done) => {
            chai.request(server)
                .put("/reports")
                .set('Content-Type', 'application/json')
                .set('x-access-token', token)
                .send(JSON.stringify({
                    week: 1,
                    text: "Report 1 (edited)"
                }))
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
    });


    describe('DELETE', () => {
        it('DELETE registered user should work', (done) => {
            let user= {
                email: "test@test.se"
            };

            chai.request(server)
                .delete("/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });

        it('DELETE report should work (token)', (done) => {
            chai.request(server)
                .delete("/reports")
                .set('Content-Type', 'application/json')
                .set('x-access-token', token)
                .send(JSON.stringify({
                    week: 1
                }))
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
    });
});
