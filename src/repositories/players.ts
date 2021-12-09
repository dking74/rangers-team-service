import { getQuery } from '../utils/database';
import { getAllPlayersQuery, getPlayerByPlayerIdQuery } from '../queries/players';
import { PlayerResponse } from '../types/players';

export const getAllPlayers = async (): Promise<PlayerResponse[]> => {
  return await getQuery<PlayerResponse[]>(getAllPlayersQuery());
}

export const getPlayerByPlayerId = async (playerId: number): Promise<PlayerResponse[]> => {
  return await getQuery<PlayerResponse[]>(getPlayerByPlayerIdQuery(playerId));
}