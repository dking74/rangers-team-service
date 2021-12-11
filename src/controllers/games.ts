import { NextFunction, Request, Response } from "express";

import { BadRequestHttpError, NotFoundHttpError } from "../errors";
import asyncWrapper from "../utils/asyncWrapper";
import {
  getAllGames as getAllGamesService,
  getGamesByYear as getGamesByYearService,
  getGameByGameId as getGameByGameIdService,
} from '../services/games';
import { GameDTO, GameYearDTO } from "../types/games";


export const getAllGames = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  let year = req.query.year as string;
  if (year) {
    const parsedYear = parseInt(year);
    if (isNaN(parsedYear)) {
        throw new BadRequestHttpError(`Please enter a valid numeric year to search player for: ${parsedYear}.`);
    }

    return await getGamesByYearService(parsedYear)
      .then((data: GameDTO[]) => {
        if (data === null) {
          throw new NotFoundHttpError(`Unable to find game data for year: ${year}.`);
        }

        return res.status(200).json(data);
      });
  }

  await getAllGamesService()
    .then((data: GameYearDTO[]) => res.status(200).json(data));
});

export const getGameInfo = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const gameId = parseInt(req.params.gameId);
  if (isNaN(gameId)) {
    throw new BadRequestHttpError('Please enter an integer for the game id.');
  }

  await getGameByGameIdService(gameId)
    .then((data: GameDTO) => {
      if (data === null) {
        throw new NotFoundHttpError(`Unable to find game with game id: ${gameId}.`);
      }
      
      return res.status(200).json(data)
    });
});