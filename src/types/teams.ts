import {
  BatYearResultDTO,
  PitchYearResultDTO,
  FieldYearResultDTO
} from './default';

/** Team Stats Types */
export interface TeamBatYearResultDTO extends BatYearResultDTO {}
export interface TeamPitchYearResultDTO extends PitchYearResultDTO {}
export interface TeamFieldYearResultDTO extends FieldYearResultDTO {}

export interface TeamStatsDTO {
  batting: TeamBatYearResultDTO;
  pitching: TeamPitchYearResultDTO;
}
export interface TeamStatsResponse {
  json_build_object: TeamStatsDTO;
}

export interface AllTeamStatsDTO {
  [year: number]: TeamStatsDTO;
}
export interface AllTeamStatsResponse {
  json_object_agg: AllTeamStatsDTO;
}

/** Team Results Types */
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
export interface TeamResultResponse {
  json_build_object: TeamResultDTO;
}

export interface AllTeamResultDTO {
  [year: number]: TeamResultDTO;
}

export interface AllTeamResultResponse {
  json_object_agg: AllTeamResultDTO;
}

/** Team Personnel Types */
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

export type TeamPersonnelDTO = TeamManagementDTO & {
  coaches: TeamCoachDTO[];
}
export interface TeamPersonnelResponse {
  json_build_object: TeamPersonnelDTO;
}

export interface AllTeamPersonnelDTO {
  [year: number]: TeamPersonnelDTO;
}
export interface AllTeamPersonnelResponse {
  json_object_agg: AllTeamPersonnelDTO;
}

/** Not in use currently */
export interface TeamYearSplitDTO {
  year: number,
  home_or_away: string,
  runs_scored: number,
  runs_allowed: number,
}