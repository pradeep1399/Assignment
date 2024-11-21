const Redis = require('ioredis');

// Use the Redis URI from the environment variable or fallback to a default value
const redisClient = new Redis(process.env.REDIS_URI || 'redis://localhost:6379');

// Add error and connection handlers for better debugging
redisClient.on('connect', () => {
  console.log('Connected to Redis successfully!');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

module.exports = redisClient;
