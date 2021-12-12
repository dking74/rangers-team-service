import { NextFunction, Request, Response } from 'express';
import { NotFoundHttpError } from '../errors';
import {
  getAllTeamPersonnel as getAllTeamPersonnelService,
  getTeamPersonnelByYear as getTeamPersonnelByYearService,
  getAllTeamResults as getAllTeamResultsService,
  getTeamResultsByYear as getTeamResultsByYearService,
  getAllTeamStats as getAllTeamStatsService,
  getTeamStatsByYear as getTeamStatsByYearService,
} from '../services/teams';
import {
  AllTeamStatsDTO,
  TeamStatsDTO,
  AllTeamResultDTO,
  TeamResultDTO,
  AllTeamPersonnelDTO,
  TeamPersonnelDTO,
} from '../types/teams';
import asyncWrapper from '../utils/asyncWrapper';

export const getAllTeamPersonnel = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const year = parseInt(req.query.year as string);
  if (!isNaN(year)) {
    return await getTeamPersonnelByYearService(year)
      .then((data: TeamPersonnelDTO) => {
        if (data === null) {
          throw new NotFoundHttpError(`Unable to find team personnel data for year: ${year}.`);
        }

        return res.status(200).json(data);
      });
  }

  await getAllTeamPersonnelService()
    .then((data: AllTeamPersonnelDTO) => res.status(200).json(data));
});

export const getAllTeamResults = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const year = parseInt(req.query.year as string);
  if (!isNaN(year)) {
    return await getTeamResultsByYearService(year)
      .then((data: TeamResultDTO) => {
        if (data === null) {
          throw new NotFoundHttpError(`Unable to find team results data for year: ${year}.`);
        }
  
        return res.status(200).json(data);
      });
  }
  
  await getAllTeamResultsService()
    .then((data: AllTeamResultDTO) => res.status(200).json(data));
});

export const getAllTeamStats = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const year = parseInt(req.query.year as string);
  if (!isNaN(year)) {
    return await getTeamStatsByYearService(year)
      .then((data: TeamStatsDTO) => {
        if (data === null) {
          throw new NotFoundHttpError(`Unable to find team personnel data for year: ${year}.`);
        }
  
        return res.status(200).json(data);
      });
  }
  
  await getAllTeamStatsService()
    .then((data: AllTeamStatsDTO) => res.status(200).json(data));
});