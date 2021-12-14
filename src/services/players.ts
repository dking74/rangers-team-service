import {
  getAllPlayers as getAllPlayersRepo,
  getPlayerByPlayerId as getPlayerByPlayerIdRepo,
  getAllYearPlayerResults as getAllYearPlayerResultsRepo,
  getPlayerStatAverages as getPlayerStatAveragesRepo,
  getPlayersByYear as getPlayersByYearRepo,
  searchForPlayer as searchForPlayerRepo,
} from '../repositories/players';
import {
  PlayerDTO,
  PlayerResponse,
  PlayerYearResultDTO,
  PlayerYearResultResponse,
  PlayerStatAveragesDTO,
  PlayerStatAveragesResponse,
  RosterByYearDTO,
  RosterByYearResponse,
  SearchPlayerResultsDTO,
  SearchPlayerResponse,
} from "../types/players";

export const getAllPlayers = async (): Promise<PlayerDTO[]> => {
  const playerResponse: PlayerResponse[] = await getAllPlayersRepo();
  const players = playerResponse.map((p: PlayerResponse) => {
    const { player } = p;
    return player as PlayerDTO;
  }) as PlayerDTO[];

  return players;
};

export const getPlayersByYear = async (playerId: number): Promise<RosterByYearDTO> => {
  const playerByYearResponse: RosterByYearResponse[] = await getPlayersByYearRepo(playerId);
  if (playerByYearResponse.length === 0) {
    return null;
  }

  const { json_agg: yearRoster } = playerByYearResponse[0];
  if (yearRoster.length === 0) {
    return null;
  }

  return yearRoster as RosterByYearDTO;
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

export const getAllYearPlayerResults = async (playerId: number): Promise<PlayerYearResultDTO> => {
  const playerStats: PlayerYearResultResponse[] = await getAllYearPlayerResultsRepo(playerId);
  if (playerStats.length === 0) {
    return null;
  }

  const { json_object_agg } = playerStats[0];
  if (json_object_agg === null || Object.keys(json_object_agg).length === 0) {
    return null;
  } 
  const playerStatsData = json_object_agg;
  return playerStatsData as PlayerYearResultDTO;
};

export const getPlayerStatAverages = async (playerId: number): Promise<PlayerStatAveragesDTO> => {
  const playerStats: PlayerStatAveragesResponse[] = await getPlayerStatAveragesRepo(playerId);
  if (playerStats.length === 0) {
    return null;
  }

  const { json_build_object: playerAverageStats } = playerStats[0];
  return playerAverageStats as PlayerStatAveragesDTO;
};

export const searchForPlayer = async (searchQuery: string): Promise<SearchPlayerResultsDTO> => {
  const searchResults: SearchPlayerResponse[] = await searchForPlayerRepo(searchQuery);
  return searchResults as SearchPlayerResultsDTO;
};