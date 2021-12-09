import { Request, Response, NextFunction } from 'express';

/**
 * Wrapper method that catches all controller exceptions to pass
 * them to the default error handler.
 * 
 * @param callback 
 * @returns {Function}
 */
const asyncWrapper = <T>(
  callback: (req: Request, res: Response, next: NextFunction) => Promise<T>
) => {
  return function(req: Request, res: Response, next: NextFunction) {
    callback(req, res, next)
      .catch((error: Error) => next(error));
  }
};

export default asyncWrapper;