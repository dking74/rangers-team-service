import {
  getAllPlayers as getAllPlayersRepo,
  getPlayerByPlayerId as getPlayerByPlayerIdRepo
} from '../repositories/players';
import { PlayerDTO, PlayerResponse } from "../types/players";

export const getAllPlayers = async (): Promise<PlayerDTO[]> => {
  const playerResponse: PlayerResponse[] = await getAllPlayersRepo();
  const players = playerResponse.map((p: PlayerResponse) => {
    const { player } = p;
    const { player_id, ...playerData } = player;
    return playerData as PlayerDTO;
  }) as PlayerDTO[];

  return players;
};

export const getPlayerByPlayerId = async (playerId: number): Promise<PlayerDTO> => {
  const playerResponse: PlayerResponse[] = await getPlayerByPlayerIdRepo(playerId);
  if (playerResponse.length === 0) {
    return null;
  }

  const { player } = playerResponse[0];
  const { player_id, ...playerData } = player;
  return playerData as PlayerDTO;
};