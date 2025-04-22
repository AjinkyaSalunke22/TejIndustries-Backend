const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const logger = require("./app/utils/logger.util");
const { standardResponse } = require("./app/utils/standardResponse.util");

const app = express();

app.use(helmet()); 
app.use(cors({})); 
app.use(morgan("combined")); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/tej-industries-server-health", (req, res) => {
    logger.info("START - /tej-industries-server-health endpoint");
    standardResponse(res, 200, true, "TejIndustries: server is healthy.", null, null);
    logger.info("END - /tej-industries-server-health endpoint");
});

app.get("/tej-industries-server-status", (req, res) => {
    logger.info("START - /tej-industries-server-status endpoint");
    standardResponse(res, 200, true, "TejIndustries : server is running on Netlify", null, null);
    logger.info("END - /tej-industries-server-status endpoint");
});

app.get("/tej-industries-db-status", async (req, res) => {
    logger.info("START - /tej-industries-db-status endpoint");
  
    try {
      await mongoose.connection.db.admin().ping();
  
      const healthcheck = {
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        dbStatus: 'connected',
        message: 'Database connected and responsive',
      };
  
      logger.info("DB health check passed");
      standardResponse(res, 200, true, "Database connected and responsive", healthcheck, null);
    } catch (error) {
      const healthcheck = {
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        dbStatus: 'not connected',
        message: 'Database not connected or not responsive',
        error: error.message,
      };
  
      logger.warn(`DB health check failed: ${error.message}`);
      standardResponse(res, 503, false, "Database not connected or not responsive", healthcheck, error.message);
    }
  
    logger.info("END - /tej-industries-db-status endpoint");
});
  

// Import and use centralized routes
// const routes = require("./app/routes");
// app.use("/api", routes); 

app.use((req, res, next) => {
    logger.warn(`Endpoint not found: ${req.method} ${req.originalUrl}`);
    standardResponse(res, 404, false, "Endpoint not found", null, null);
});

app.use((err, req, res, next) => {
    logger.error("Internal Server Error:", err);
    standardResponse(res, 500, false, "Internal Server Error", null, null);
});

module.exports = app;
