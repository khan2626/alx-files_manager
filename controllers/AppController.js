const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');


const AppController = {
    async getStatus(req, res) {
        const redisAlive = redisClient.isAlive();
        const dbAlive = dbClient.isAlive();

        if (redisAlive && dbAlive) {
            res.status(200).json({ 'redis': true, 'db': true });
        } else {
            res.status(500).json({ 'redis': false, 'db': false });
        }
    },
    async getStats(req, res) {
            try {
                const usersCount = await dbClient.nbUsers();
                const filesCount = await dbClient.nbFiles();
                res.status(200).json({ 'users': usersCount, 'files': filesCount });
            } catch (error) {
                res.status(500).json({ 'error': error.message });
            }
    }
};

module.exports = AppController;