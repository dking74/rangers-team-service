require('dotenv').config();
import express from 'express';
import cors from 'cors';

import routes from './routes';

const app = express();
app.use(express.json());
app.use(cors({
  origin: []
}));

/** Entry point into routes for API */
app.use('/', (req: express.Request, res: express.Response) => {
  res.status(404).json({
    error: 'This path is not usable. Please submit requests to \'/api*\'.'
  })
});
app.use('/api', routes);

/** Default error handler */
app.use((
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const status = 500;
  const message = err?.message || 'An unexpected error occurred.'
  res.status(status).json({
    error: message,
  });
})

export default app;