const { Kafka } = require('kafkajs');
const redisClient = require('./redisClient');

const kafka = new Kafka({
  clientId: 'event-processor',
  brokers: [process.env.KAFKA_BROKER],
});

const consumer = kafka.consumer({ groupId: 'event-group' });

const startListener = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: process.env.KAFKA_TOPIC, fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());
      console.log('Received event:', event);
      await redisClient.lpush('eventQueue', JSON.stringify(event));
    },
  });
};

module.exports = startListener;
