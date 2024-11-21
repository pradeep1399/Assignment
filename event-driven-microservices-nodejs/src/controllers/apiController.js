const Event = require('../models/eventModel');
const redisClient = require('../services/redisClient');

const getEvents = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const events = await Event.find()
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send({ error: 'Failed to fetch events' });
  }

};

const processManualEvent = async (req, res) => {
  try {
    const event = req.body;
    const existingEvent = await Event.findOne({ eventId: event.eventId });

    if (existingEvent) {
      return res.status(400).send({ message: 'Event with this eventId already exists' });
    }

    // Push the event to the Redis queue
   const result = await redisClient.lpush('eventQueue', JSON.stringify(event));
   
    res.status(201).send({ message: 'Event submitted for processing' });
  } catch (error) {
    console.error('Error processing manual event:', error);
    res.status(500).send({ error: 'Failed to process the event' });
  }
};

const getMetrics = async (req, res) => {
  try{
    const metrics = await Event.aggregate([
      { $group: { _id: null, total: { $sum: 1 }, avgItems: { $avg: '$metrics.average' } } },
    ]);
    res.json(metrics[0] || { total: 0, avgItems: 0 });
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).send({ error: 'Failed to fetch metrics' });
  }
};

module.exports = { getEvents, processManualEvent, getMetrics };
