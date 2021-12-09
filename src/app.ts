require('dotenv').config();
import express from 'express';
import cors from 'cors';

import routes from './routes';
import { HttpError } from './errors';

const app = express();
app.use(express.json());
app.use(cors({
  origin: []
}));



/** Entry point into routes for API */
app.use('/api', routes);
app.use('*', (req: express.Request, res: express.Response) => {
  res.status(404).json({
    error: 'This path is not usable. Please submit requests to \'/api*\'.'
  })
});

/** Default error handler */
app.use((
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  console.error(`An error occurred in application: ${err.message}`, err?.stack);

  const status = (err instanceof HttpError) ? err.code : 500;
  const message = err?.message || 'An unexpected error occurred.';
  return res.status(status).json({
    status,
    error: message,
  });
});

export default app;