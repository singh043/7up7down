import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import path from 'path';

const __dirname = path.resolve();

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000!")
})

import { generateRandomNumber } from "./controllers/numberGeneration.controller.js";
import { checkResult } from './controllers/checkGuess.controller.js';
import { pointsCalculation } from "./controllers/pointsCalculation.controller.js";

app.get('/api/diceNumber', generateRandomNumber)
app.post('/api/checkGuess', checkResult)
app.post('/api/calculatePoints', pointsCalculation)

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
})