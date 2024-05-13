const { MongoClient } = require('mongodb');

class DBClient {
    constructor() {
        // Get MongoDB connection parameters from environment variables or use defaults
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';

        // MongoDB connection URL
        const url = `mongodb://${host}:${port}/${database}`;

        // Create a MongoDB client
        this.client = new MongoClient(url, { useUnifiedTopology: true });

        // Connect to MongoDB
        this.client.connect();
    }

    // Function to check if the connection to MongoDB is alive
    isAlive() {
        return this.client.isConnected();
    }

    // Asynchronous function to get the number of documents in the 'users' collection
    async nbUsers() {
        const db = this.client.db();
        const usersCollection = db.collection('users');
        return usersCollection.countDocuments();
    }

    // Asynchronous function to get the number of documents in the 'files' collection
    async nbFiles() {
        const db = this.client.db();
        const filesCollection = db.collection('files');
        return filesCollection.countDocuments();
    }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
module.exports = dbClient;