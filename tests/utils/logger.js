import winston from 'winston';
import path from 'path';
import fs from 'fs';

const { combine, timestamp, printf, colorize } = winston.format;

// Function to generate custom timestamp format
const customTimestampFormat = () => {
    const date = new Date();
    return date.toString();  // Returns timestamp in the desired format
};

// Define log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const logDir = 'logs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Create Winston logger
const logger = winston.createLogger({
    level: 'info',  // Default log level
    format: combine(
        timestamp({ format: customTimestampFormat }),  // Use custom timestamp function
        colorize(),  // Optional: Adds color to logs in the console
        logFormat
    ),
    transports: [
        new winston.transports.Console(),  // Log to the console
        new winston.transports.File({ filename: path.join('logs', 'combined.log') }),  // Log to a file
    ],
});

// Custom log method to default to 'info' level
logger.log = function (message) {
    this.info(message);  // Log the message with 'info' level
};

export default logger;
