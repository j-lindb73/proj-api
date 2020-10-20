const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = 1337;
const bodyParser = require("body-parser");

// import modules
const stockModule = require('./models/stock');

// import routes
const index = require('./routes/index');
const register = require('./routes/register');
const login = require('./routes/login');
const reports = require('./routes/reports');
const user = require('./routes/user');
const stock = require('./routes/stock');
// const chat = require('./routes/chat');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.use(cors());

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

// This is middleware called for all routes.
// Middleware takes three parameters.
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});


// Add routes
app.use('/', index);
app.use('/register', register);
app.use('/reports', reports);
app.use('/login', login);
app.use('/user', user);
app.use('/stock', stock);
// app.use('/chat', chat);


// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
    return undefined;
});

// Start up server
const server = app.listen(port, () => console.log(`Example API listening on port ${port}!`));

// Stock socket
const io = require("socket.io")(server);


var hallonbatar = {
    name: "Hallonbåtar",
    rate: 1.002,
    variance: 0.6,
    startingPoint: 20,
};

var lakritssnoren = {
    name: "Lakritssnören",
    rate: 1.001,
    variance: 0.4,
    startingPoint: 20,
};

var cakes = [hallonbatar, lakritssnoren];


// function getRandomValue() {
//     return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
// }

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

setInterval(function () {
    cakes.map((cake) => {
        cake["course"] = stockModule.getStockPrice(cake);
        cake["timestamp"] = getNow();
        return cake;
    });

    // console.log(cakes);

    io.emit("newdata", cakes);
}, 5000);

// Get timestamp

function getNow() {
    const d = new Date();
    const timestampISO = d.toISOString();

    return timestampISO;
}

module.exports = server;
