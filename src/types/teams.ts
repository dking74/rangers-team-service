import {
  BatYearResultDTO,
  PitchYearResultDTO,
  FieldYearResultDTO
} from './default';

export interface TeamBatYearResultDTO extends BatYearResultDTO {}
export interface TeamPitchYearResultDTO extends PitchYearResultDTO {}
export interface TeamFieldYearResultDTO extends FieldYearResultDTO {}

export interface TeamPostseasonResultDTO {
  series_name: string,
  opponent: string,
  result: string,   
}

export interface TeamResultDTO {
  year: number,
  wins: number,
  losses: number,
  ties: number,
  division_place: number,
  attendance: number,
  postseason: TeamPostseasonResultDTO[]
}

export interface TeamManagementDTO {
  year: number,
  manager: string,
  general_manager: string,
  president: string,
}

export interface TeamCoachDTO {
  year: number,
  name: string,
  coach_type: string,
}

export interface TeamYearSplitDTO {
  year: number,
  home_or_away: string,
  runs_scored: number,
  runs_allowed: number,
}