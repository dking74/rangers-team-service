import { NextFunction, Request, Response } from "express";

import asyncWrapper from "../utils/asyncWrapper";
import { BadRequestHttpError, NotFoundHttpError } from '../errors';
import {
  getAllPlayers as getAllPlayersService,
  getPlayerByPlayerId as getPlayerByPlayerIdService,
  getAllYearPlayerResults as getAllYearPlayerResultsService,
  getPlayerStatAverages as getPlayerStatAveragesService,
  getPlayersByYear as getPlayersByYearService,
  searchForPlayer as searchForPlayerService,
} from "../services/players";
import {
  PlayerDTO,
  PlayerYearResultDTO,
  PlayerStatAveragesDTO,
  RosterByYearDTO,
  SearchPlayerResultsDTO,
} from "../types/players";

export const getAllPlayers = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  let year = req.query.year as string;
  if (year) {
    const parsedYear = parseInt(year);
    if (isNaN(parsedYear)) {
      throw new BadRequestHttpError(`Please enter a valid numeric year to search player for: ${parsedYear}.`);
    }

    return await getPlayersByYearService(parsedYear)
      .then((data: RosterByYearDTO) => {
        if (data === null) {
          throw new NotFoundHttpError(`Unable to find roster for year: ${parsedYear}.`);
        }

        return res.status(200).json(data);
      });
  }

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
    .then((data: PlayerYearResultDTO) => {
      if (data === null) {
        throw new NotFoundHttpError(`No player with player id ${playerId} found.`);
      }

      res.status(200).json(data);
    });
});

export const getPlayerTeamCareerAverages = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const playerId = req.playerId;
  await getPlayerStatAveragesService(playerId)
    .then((data: PlayerStatAveragesDTO) => {
      if (data === null) {
        throw new NotFoundHttpError(`No player with player id ${playerId} found.`);
      }
      
      return res.status(200).json(data);
    });
});

export const searchForPlayer = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const query = req.query.q as string;
  if (!query) {
    throw new BadRequestHttpError(`The request could not be completed because the query parameters 'q' was not submitted.`);
  }

  await searchForPlayerService(query)
    .then((data: SearchPlayerResultsDTO) => {
      if (data === null) {
        throw new NotFoundHttpError(`No results found for query: ${query}.`);
      }
      return res.status(200).json(data)
    });
});