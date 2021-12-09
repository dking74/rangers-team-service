import { getQuery } from '../utils/database';
import {
  getAllPlayersQuery,
  getAllYearPlayerResultsQuery,
  getPlayerByPlayerIdQuery,
  getPlayerStatAveragesQuery,
} from '../queries/players';
import {
  PlayerResponse,
  PlayerYearResultResponse,
  PlayerStatAveragesResponse,
} from '../types/players';

export const getAllPlayers = async (): Promise<PlayerResponse[]> => {
  return await getQuery<PlayerResponse[]>(getAllPlayersQuery());
};

export const getPlayerByPlayerId = async (playerId: number): Promise<PlayerResponse[]> => {
  return await getQuery<PlayerResponse[]>(getPlayerByPlayerIdQuery(playerId));
};

export const getAllYearPlayerResults = async (playerId: number): Promise<PlayerYearResultResponse[]> => {
  return await getQuery<PlayerYearResultResponse[]>(getAllYearPlayerResultsQuery(playerId));
};

export const getPlayerStatAverages = async (playerId: number): Promise<PlayerStatAveragesResponse[]> => {
  return await getQuery<PlayerStatAveragesResponse[]>(getPlayerStatAveragesQuery(playerId));
};