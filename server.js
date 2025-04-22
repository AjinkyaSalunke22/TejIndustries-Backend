require('dotenv').config();
const app = require('./app');
const logger = require('./app/utils/logger.util');
const connectDB = require('./app/models/index.model'); 

const PORT = process.env.PORT || 8002;

const startServer = async () => {
  await connectDB(); 

  const server = app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
    console.log(`Server is running on port ${PORT}`);
  });

  const gracefulShutdown = () => {
    logger.info('Shutting down gracefully...');
    server.close(() => {
      logger.info('Server closed');
      process.exit(0);
    });
  };

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
};

startServer();
