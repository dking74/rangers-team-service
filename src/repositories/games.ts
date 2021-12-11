import { getQuery } from "../utils/database";
import {
  AllGameResponse,
  GameYearResponse,
  SingleGameResponse,
} from "../types/games";
import {
  getAllGamesQuery,
  getGameByYearQuery,
  getGameByGameIdQuery,
} from "../queries/games";

export const getAllGames = async (): Promise<AllGameResponse[]> => {
  return await getQuery<AllGameResponse[]>(getAllGamesQuery);
};

export const getGamesByYear = async (year: number): Promise<GameYearResponse[]> => {
  return await getQuery<GameYearResponse[]>(getGameByYearQuery(year));
};

export const getGameByGameId = async (gameId: number): Promise<SingleGameResponse[]> => {
  return await getQuery<SingleGameResponse[]>(getGameByGameIdQuery(gameId));
};