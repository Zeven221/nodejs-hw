import express from 'express';
const app = express();
const PORT = process.env.PORT ?? 3000;
import 'dotenv/config';
import cors from 'cors';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
app.use(express.json());
app.use(cors());
app.use(logger);
app.use(notesRoutes);
app.use(notFoundHandler);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log('Server is successful running!');
});
