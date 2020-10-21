const mongo = require("mongodb").MongoClient;
// The mongo-server is local, both in development and production
// const dsn = "mongodb://localhost:27017/chat";


const chat = {
    findInCollection: async function(dsn, collection, criteria, projection, limit) {
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection(collection);
        const res = await col.find(criteria, projection).limit(limit).toArray();

        await client.close();

        return res;
    },

    insertCollection: async function(dsn, collection, doc) {
        const client = await mongo.connect(dsn);
        const db = await client.db();
        const col = await db.collection(collection);

        await col.insertOne(doc);
        await client.close();
    }
};

module.exports = chat;
