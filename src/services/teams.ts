import {
  getAllTeamStats as getAllTeamStatsRepo,
  getTeamStatsByYear as getTeamStatsByYearRepo,
  getAllTeamPersonnel as getAllTeamPersonnelRepo,
  getTeamPersonnelByYear as getTeamPersonnelByYearRepo,
  getAllTeamResults as getAllTeamResultsRepo,
  getTeamResultsByYear as getTeamResultsByYearRepo,
} from '../repositories/teams';
import {
  AllTeamStatsDTO,
  TeamStatsDTO,
  AllTeamResultDTO,
  TeamResultDTO,
  AllTeamPersonnelDTO,
  TeamPersonnelDTO,
  AllTeamStatsResponse,
  TeamStatsResponse,
  AllTeamResultResponse,
  TeamResultResponse,
  AllTeamPersonnelResponse,
  TeamPersonnelResponse,
} from '../types/teams';

export const getAllTeamStats = async (): Promise<AllTeamStatsDTO> => {
  const teamStatsResponse: AllTeamStatsResponse[] = await getAllTeamStatsRepo();
  if (teamStatsResponse.length === 0) {
    return null;
  }

  const { json_object_agg } = teamStatsResponse[0];
  return json_object_agg as AllTeamStatsDTO;
};

export const getTeamStatsByYear = async (year: number): Promise<TeamStatsDTO> => {
  const teamStatsResponse: TeamStatsResponse[] = await getTeamStatsByYearRepo(year);
  if (teamStatsResponse.length === 0) {
    return null;
  }

  const { json_build_object } = teamStatsResponse[0];
  const stats = {
    batting: json_build_object?.batting?.length > 0 ? json_build_object.batting[0] : {},
    pitching: json_build_object?.pitching?.length > 0 ? json_build_object.pitching[0] : {},
  };
  return stats as TeamStatsDTO;
};

export const getAllTeamPersonnel = async (): Promise<AllTeamPersonnelDTO> => {
  const teamPersonnelResponse: AllTeamPersonnelResponse[] = await getAllTeamPersonnelRepo();
  if (teamPersonnelResponse.length === 0) {
    return null;
  }

  const { json_object_agg } = teamPersonnelResponse[0];
  return json_object_agg as AllTeamPersonnelDTO;
};

export const getTeamPersonnelByYear = async (year: number): Promise<TeamPersonnelDTO> => {
  const teamPersonnelResponse: TeamPersonnelResponse[] = await getTeamPersonnelByYearRepo(year);
  if (teamPersonnelResponse.length === 0) {
      return null;
    }
  
    const { json_build_object } = teamPersonnelResponse[0];
    return json_build_object as TeamPersonnelDTO;
};

export const getAllTeamResults = async (): Promise<AllTeamResultDTO> => {
  const teamResultsResponse: AllTeamResultResponse[] = await getAllTeamResultsRepo();
  if (teamResultsResponse.length === 0) {
    return null;
  }
  
  const { json_object_agg } = teamResultsResponse[0];
  return json_object_agg as AllTeamResultDTO;
};
export const getTeamResultsByYear = async (year: number): Promise<TeamResultDTO> => {
  const teamResultResponse: TeamResultResponse[] = await getTeamResultsByYearRepo(year);
  if (teamResultResponse.length === 0) {
    return null;
  }
    
  const { json_build_object } = teamResultResponse[0];
  return json_build_object as TeamResultDTO;
};