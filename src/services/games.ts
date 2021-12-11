import {
  getAllGames as getAllGamesRepo,
  getGamesByYear as getGamesByYearRepo,
  getGameByGameId as getGameByGameIdRepo,
} from '../repositories/games';
import {
  GameDTO,
  AllGameResponse,
  GameYearDTO,
  GameYearResponse,
  SingleGameResponse,
} from '../types/games';

export const getAllGames = async (): Promise<GameYearDTO[]> => {
  const gamesResponse: AllGameResponse[] = await getAllGamesRepo();
  if (gamesResponse.length === 0) {
    return null;
  }

  const { json_object_agg } = gamesResponse[0];
  if (Object.keys(json_object_agg).length === 0) {
    return null;
  }

  return json_object_agg as GameYearDTO[];
};

export const getGamesByYear = async (year: number): Promise<GameDTO[]> => {
  const gamesResponse: GameYearResponse[] = await getGamesByYearRepo(year);
  if (gamesResponse.length === 0) {
    return null;
  }

  const { json_agg } = gamesResponse[0];
  return json_agg as GameDTO[];
};

export const getGameByGameId = async (gameId: number): Promise<GameDTO> => {
  const gameResult: SingleGameResponse[] = await getGameByGameIdRepo(gameId);
  if (gameResult.length === 0) {
    return null;
  }

  const { row_to_json } = gameResult[0];
  return row_to_json as GameDTO;
};