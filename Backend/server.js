import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite Database directly
export let db;

(async () => {
  try {
    // For Vercel Serverless, writing to /tmp is required as it's the only writable dir
    // But for local testing, we'll write to ./dev.db
    const dbPath = process.env.VERCEL ? '/tmp/dev.db' : './dev.db';
    
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS requests (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        company TEXT,
        type TEXT NOT NULL,
        budget TEXT,
        status TEXT DEFAULT 'Unread',
        date DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log(`Connected to native SQLite database at ${dbPath}`);
  } catch (error) {
    console.error('Failed to initialize SQLite database:', error);
  }
})();

// Routes
app.use('/api', apiRoutes);

// Only listen if not running in Vercel Serverless environment
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel Serverless
export default app;
