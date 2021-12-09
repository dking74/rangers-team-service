import { NextFunction, Request, Response } from "express";

import asyncWrapper from "../utils/asyncWrapper";
import { PlayerDTO } from "../types/players";
import { NotFoundHttpError } from '../errors';
import {
  getAllPlayers as getAllPlayersService,
  getPlayerByPlayerId as getPlayerByPlayerIdService
} from "../services/players";

export const getAllPlayers = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  await getAllPlayersService()
    .then((data: PlayerDTO[]) => res.status(200).json(data));
});

export const getPlayerByPlayerId = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const playerId: number = parseInt(req.params.playerId);
  if (isNaN(playerId)) {
    return res.status(400).json({
      error: 'Player id value must be of type number and identify a player.'
    })
  }

  await getPlayerByPlayerIdService(playerId)
    .then((data: PlayerDTO) => {
      if (data === null) {
        throw new NotFoundHttpError(`No player with player id ${playerId} found.`);
      }
      res.status(200).json(data)
    })
});