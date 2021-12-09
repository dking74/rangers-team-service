import {
  BatYearResultDTO,
  PitchYearResultDTO,
  FieldYearResultDTO
} from './default';

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

export interface RosterDTO {
  year: number,
  player: PlayerDTO,
}

export interface PlayerBatYearResultDTO extends BatYearResultDTO {}
export interface PlayerPitchYearResultDTO extends PitchYearResultDTO {}
export interface PlayerFieldYearResultDTO extends FieldYearResultDTO {}