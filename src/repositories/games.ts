import { getQuery } from "../utils/database";
import {
  GameResponse,
  GameYearResponse,
} from "../types/games";
import {
  getAllGamesQuery,
  getGameByYearQuery,
} from "../queries/games";

export const getAllGames = async (): Promise<GameResponse[]> => {
  return await getQuery<GameResponse[]>(getAllGamesQuery);
};

export const getGamesByYear = async (year: number): Promise<GameYearResponse[]> => {
  return await getQuery<GameYearResponse[]>(getGameByYearQuery(year));
};