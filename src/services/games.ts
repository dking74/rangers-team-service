import {
  getAllGames as getAllGamesRepo,
  getGamesByYear as getGamesByYearRepo,
} from '../repositories/games';
import {
  GameDTO,
  GameResponse,
  GameYearDTO,
  GameYearResponse,
} from '../types/games';

export const getAllGames = async (): Promise<GameYearDTO[]> => {
  const gamesResponse: GameResponse[] = await getAllGamesRepo();
  if (gamesResponse.length === 0) {
    return null;
  }

  const { json_object_agg } = gamesResponse[0];
  if (Object.keys(json_object_agg).length === 0) {
    return null;
  }

  return json_object_agg as GameYearDTO[];
};

export const getGamesByYear = async (year: number): Promise<GameDTO> => {
  const gamesResponse: GameYearResponse[] = await getGamesByYearRepo(year);
  if (gamesResponse.length === 0) {
    return null;
  }

  const { json_agg } = gamesResponse[0];
  return json_agg as GameDTO;
};