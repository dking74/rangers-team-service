import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  const playerId: number = parseInt(req.params.playerId);
  if (isNaN(playerId)) {
    return res.status(400).json({
      error: 'Player id value must be of type number and identify a player.'
    });
  }
  req.playerId = playerId;
  next();
}