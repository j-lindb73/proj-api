
[![Build Status](https://travis-ci.org/j-lindb73/proj-api.svg?branch=master)](https://travis-ci.org/github/j-lindb73/proj-api)
[![Build Status](https://scrutinizer-ci.com/g/j-lindb73/proj-api/badges/build.png?b=master)](https://scrutinizer-ci.com/g/j-lindb73/proj-api/build-status/master)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/j-lindb73/proj-api/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/j-lindb73/proj-api/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/j-lindb73/proj-api/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/j-lindb73/proj-api/?branch=master)


# proj-api

## Project setup

Set up the environment and install dependencies

```
npm install
```

### Configuration

If run on public servers in production, be sure to change secret in ```config.json```.

### Start server 

Start server in monitor mode (restart when file changes)

```
npm run start
```

### Documentation

[Express](https://expressjs.com/) is used to create API. 

[SQLITE](https://sqlite.org/) is used to handle database which contains information about registered users and their money and stocks.

[mongoDB](https://mongodb.com) is ised to save chat messages between sessions.



### Reset chatlog

SSH to server.
```
proj-api/mongodb/node setup.js
```
