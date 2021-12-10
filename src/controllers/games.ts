import { NextFunction, Request, Response } from "express";

import { BadRequestHttpError, NotFoundHttpError } from "../errors";
import asyncWrapper from "../utils/asyncWrapper";
import {
  getAllGames as getAllGamesService,
  getGamesByYear as getGamesByYearService,
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
      .then((data: GameDTO) => {
        if (data === null) {
          throw new NotFoundHttpError(`Unable to find game data for year: ${year}.`);
        }

        return res.status(200).json(data);
      });
  }

  await getAllGamesService()
    .then((data: GameYearDTO[]) => res.status(200).json(data));
});