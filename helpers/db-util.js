import { MongoClient } from 'mongodb';

export async function connectDatabase() {
    try {
        const connectionString = "mongodb+srv://events:events@cluster0.epull.mongodb.net/events?retryWrites=true&w=majority";
        const client = await MongoClient.connect(connectionString, { useUnifiedTopology: true });

        return client;
    } catch (error) {
        error
    }
}

export async function insertDocument(client, collection, document) {
    const db = client.db();

    const result = await db.collection(collection).insertOne(document);
    return result;
}

export async function getAllDocuments(client, collection, sort) {
    const db = client.db();

    const documents = await db.collection(collection).find().sort(sort).toArray();

    return documents;
}