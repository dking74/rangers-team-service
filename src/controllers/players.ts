import { NextFunction, Request, Response } from "express";

import asyncWrapper from "../utils/asyncWrapper";
import { NotFoundHttpError } from '../errors';
import {
  getAllPlayers as getAllPlayersService,
  getPlayerByPlayerId as getPlayerByPlayerIdService,
  getAllYearPlayerResults as getAllYearPlayerResultsService,
  getPlayerStatAverages as getPlayerStatAveragesService,
} from "../services/players";
import {
  PlayerDTO,
  PlayerYearResultDTO,
  PlayerStatAveragesDTO,
} from "../types/players";

export const getAllPlayers = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  await getAllPlayersService()
    .then((data: PlayerDTO[]) => res.status(200).json(data));
});

export const getPlayerByPlayerId = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const playerId = req.playerId;
  await getPlayerByPlayerIdService(playerId)
    .then((data: PlayerDTO) => {
      if (data === null) {
        throw new NotFoundHttpError(`No player with player id ${playerId} found.`);
      }
      res.status(200).json(data)
    })
});

export const getYearlyPlayerResults = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const playerId = req.playerId;
  await getAllYearPlayerResultsService(playerId)
    .then((data: PlayerYearResultDTO) => res.status(200).json(data));
});

export const getPlayerTeamCareerAverages = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const playerId = req.playerId;
  await getPlayerStatAveragesService(playerId)
    .then((data: PlayerStatAveragesDTO) => res.status(200).json(data));
});