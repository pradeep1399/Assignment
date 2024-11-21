const redisClient = require('./redisClient');
const Event = require('../models/eventModel');

// Utility function for retries with exponential backoff
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const processEvent = async (event) => {
  try {
    console.log('Processing event:', event);
    
    // Example metric calculation
    const metrics = {
      count: event.payload.items.length,
      average: event.payload.items.reduce((sum, item) => sum + item.value, 0) / event.payload.items.length,
    };

    // Check for duplicates using eventId before saving (optional)
    const existingEvent = await Event.findOne({ eventId: event.eventId });
    if (existingEvent) {
      console.log(`Event with eventId ${event.eventId} already exists.`);
      return;
    }

    // Save to database (MongoDB)
    const newEvent = new Event({
      eventId: event.eventId,
      userId: event.userId,
      payload: event.payload,
      metrics,
      status: 'Completed',
    });

    await newEvent.save();
    console.log('Event saved to MongoDB:', newEvent);
  } catch (err) {
    console.error('Error processing event:', err);
    throw err; // Let the error propagate
  }
};

const processQueue = async () => {
  while (true) {
    try {
      const event = await redisClient.brpop('eventQueue', 0); // Block until an event is available
      const parsedEvent = JSON.parse(event[1]);
      console.log('Event received:', parsedEvent);

      let attempts = 0;
      const maxRetries = 5;
      let processed = false;

      // Retry logic with exponential backoff
      while (attempts < maxRetries && !processed) {
        try {
          await processEvent(parsedEvent);
          processed = true; // Mark as processed
        } catch (err) {
          attempts++;
          const backoffTime = Math.pow(2, attempts) * 1000; // Exponential backoff
          console.log(`Error processing event. Retrying in ${backoffTime / 1000} seconds...`);
          await delay(backoffTime); // Wait before retrying
        }
      }

      // If it failed after max retries, push to failed queue
      if (!processed) {
        console.error(`Failed to process event after ${maxRetries} attempts. Pushing to failed queue.`);
        await redisClient.lpush('failedQueue', JSON.stringify(parsedEvent));
      }

    } catch (err) {
      console.error('Error in processing queue:', err);
    }
  }
};

// Start processing events from Redis queue
const startProcessing = async () => {
  console.log('Starting event processor...');
  await processQueue(); // Process events indefinitely
};

module.exports = startProcessing;
