import {
  BatYearResultDTO,
  PitchYearResultDTO,
  FieldYearResultDTO
} from './default';

/** Player MetaData Types */
export interface PlayerDTO {
  first_name: string,
  last_name: string,
  logo: string,
  age: number,
  dob: string,
  country: string,
  position: string,
  bats: string,
  throws: string,
  height: string,
  weight: number,
  years: number,
}
export interface PlayerResponse {
  player: {
    player_id: number
  } & PlayerDTO
}

/** Roster Types */
export interface RosterDTO {
  year: number,
  player: PlayerDTO,
}

/** Individual Stat Year Result Types */
export interface PlayerBatYearResultDTO extends BatYearResultDTO {}
export interface PlayerPitchYearResultDTO extends PitchYearResultDTO {}
export interface PlayerFieldYearResultDTO extends FieldYearResultDTO {}

/** Player Year Result Types */
export interface PlayerYearResultDTO {
  [year: number]: {
    batting: PlayerBatYearResultDTO[];
    pitching: PlayerPitchYearResultDTO[];
  }
}
export interface PlayerYearResultResponseByYear {
  [year: number]: {
    batting: (PlayerBatYearResultDTO & { year: number })[];
    pitching: (PlayerPitchYearResultDTO & { year: number })[];
  }
}
export interface PlayerYearResultResponse {
  json_object_agg: PlayerYearResultResponseByYear;
}

/** Player Stat Averages Types */
export interface PlayerStatAveragesDTO {
  batting: PlayerBatYearResultDTO | null;
  pitching: PlayerPitchYearResultDTO | null;
}
export interface PlayerStatAveragesResponse {
  json_build_object: PlayerStatAveragesDTO;
}

/** Roster By Year Types */
export type RosterByYearDTO = PlayerDTO[];
export interface RosterByYearResponse {
  json_agg: RosterByYearDTO;
}