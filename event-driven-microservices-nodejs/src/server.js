const app = require('./app');
const startListener = require('./services/eventListener');
const startProcessing = require('./services/eventProcessor');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startListener();
  startProcessing();
});
