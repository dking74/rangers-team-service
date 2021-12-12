import { getQuery } from '../utils/database';
import {
  getAllStatTeamResultsQuery,
  getTeamStatResultsByYearQuery,
  getAllTeamPersonnelQuery,
  getTeamPersonnelByYearQuery,
  getAllTeamResultsQuery,
  getTeamResultsByYearQuery,
} from '../queries/teams';
import {
  AllTeamStatsResponse,
  TeamStatsResponse,
  AllTeamResultResponse,
  TeamResultResponse,
  AllTeamPersonnelResponse,
  TeamPersonnelResponse,
} from '../types/teams';

export const getAllTeamStats = async (): Promise<AllTeamStatsResponse[]> => {
  return await getQuery<AllTeamStatsResponse[]>(getAllStatTeamResultsQuery);
};

export const getTeamStatsByYear = async (year: number): Promise<TeamStatsResponse[]> => {
  return await getQuery<TeamStatsResponse[]>(getTeamStatResultsByYearQuery(year));
};

export const getAllTeamPersonnel = async (): Promise<AllTeamPersonnelResponse[]> => {
  return await getQuery<AllTeamPersonnelResponse[]>(getAllTeamPersonnelQuery);
};

export const getTeamPersonnelByYear = async (year: number): Promise<TeamPersonnelResponse[]> => {
  return await getQuery<TeamPersonnelResponse[]>(getTeamPersonnelByYearQuery(year));
};

export const getAllTeamResults = async (): Promise<AllTeamResultResponse[]> => {
  return await getQuery<AllTeamResultResponse[]>(getAllTeamResultsQuery);
};

export const getTeamResultsByYear = async (year: number): Promise<TeamResultResponse[]> => {
  return await getQuery<TeamResultResponse[]>(getTeamResultsByYearQuery(year));
};