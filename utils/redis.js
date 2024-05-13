import { createClient } from "redis";


class RedisClient{
    constructor() {
        // Create a client to Redis
        this.client = createClient();

        this.client.on('error', (err) => {
            console.error('Redis Client Error:', err);
        });
    }

    // Function to check if the connection to Redis is alive
    isAlive() {
        return this.client.connected;
    }

    // Asynchronous function to get the value from Redis for a given key
    async get(key){
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    // Asynchronous function to set a value in Redis with an expiration time
    async set(key, val, duration) {
        return new Promise((resolve, reject) => {
            this.client.setex(key, duration, val, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
        
    }

    // Asynchronous function to delete a value from Redis for a given key
    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;