const db = require('../db/database');


const texts = {
    getReport: async function (week) {
        console.log("denna vecka:" + week);
        let sql = `SELECT week, text FROM reports WHERE week = ?;`;

        let res = await db.each(sql, week, function(err, row) {
            console.log(row.week + ": " + row.text);
        });

        return res;
    }

};

module.exports = texts;
