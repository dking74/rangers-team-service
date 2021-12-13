import { getQuery } from '../utils/database';
import {
  getAllPlayersQuery,
  getAllYearPlayerResultsQuery,
  getPlayerByPlayerIdQuery,
  getPlayerStatAveragesQuery,
  getPlayersByYearQuery,
  searchPlayerQuery,
} from '../queries/players';
import {
  PlayerResponse,
  PlayerYearResultResponse,
  PlayerStatAveragesResponse,
  RosterByYearResponse,
  SearchPlayerResponse,
} from '../types/players';

export const getAllPlayers = async (): Promise<PlayerResponse[]> => {
  return await getQuery<PlayerResponse[]>(getAllPlayersQuery());
};

export const getPlayersByYear = async (year: number): Promise<RosterByYearResponse[]> => {
  return await getQuery<RosterByYearResponse[]>(getPlayersByYearQuery(year));
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

export const searchForPlayer = async (searchQuery: string): Promise<SearchPlayerResponse[]> => {
  return await getQuery<SearchPlayerResponse[]>(searchPlayerQuery(searchQuery));
};