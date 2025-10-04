/**
 * Centralized logging utility
 */

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug'
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, any>;
  error?: Error;
  userId?: string;
  ip?: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatLogEntry(entry: LogEntry): string {
    const { timestamp, level, message, context, error, userId, ip } = entry;
    
    let logString = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    
    if (userId) logString += ` | User: ${userId}`;
    if (ip) logString += ` | IP: ${ip}`;
    if (context) logString += ` | Context: ${JSON.stringify(context)}`;
    if (error) logString += ` | Error: ${error.stack}`;
    
    return logString;
  }

  private log(entry: LogEntry): void {
    const logString = this.formatLogEntry(entry);
    
    // In development, log to console
    if (this.isDevelopment) {
      switch (entry.level) {
        case LogLevel.ERROR:
          console.error(logString);
          break;
        case LogLevel.WARN:
          console.warn(logString);
          break;
        case LogLevel.INFO:
          console.info(logString);
          break;
        case LogLevel.DEBUG:
          console.debug(logString);
          break;
      }
    }
    
    // In production, you would send to external logging service
    // e.g., Sentry, LogRocket, or cloud logging
  }

  error(message: string, error?: Error, context?: Record<string, any>, userId?: string, ip?: string): void {
    this.log({
      level: LogLevel.ERROR,
      message,
      timestamp: new Date().toISOString(),
      error,
      context,
      userId,
      ip
    });
  }

  warn(message: string, context?: Record<string, any>, userId?: string, ip?: string): void {
    this.log({
      level: LogLevel.WARN,
      message,
      timestamp: new Date().toISOString(),
      context,
      userId,
      ip
    });
  }

  info(message: string, context?: Record<string, any>, userId?: string, ip?: string): void {
    this.log({
      level: LogLevel.INFO,
      message,
      timestamp: new Date().toISOString(),
      context,
      userId,
      ip
    });
  }

  debug(message: string, context?: Record<string, any>, userId?: string, ip?: string): void {
    if (this.isDevelopment) {
      this.log({
        level: LogLevel.DEBUG,
        message,
        timestamp: new Date().toISOString(),
        context,
        userId,
        ip
      });
    }
  }
}

export const logger = new Logger();