CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    money FLOAT DEFAULT 0,
    UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS reports (
    week INT,
    text TEXT,
    UNIQUE(week)
);

CREATE TABLE IF NOT EXISTS stocks (
    stockname VARCHAR(15),
    desc TEXT,
    UNIQUE(stockname)
);

CREATE TABLE IF NOT EXISTS users_stocks (
    email VARCHAR(255) NOT NULL,
    stockname VARCHAR(15) NOT NULL,
    amount INT,
    price FLOAT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);